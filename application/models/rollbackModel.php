<?php
class RollbackModel extends CI_Model{
	function __construct(){
		parent::__construct();
		$this->load->database();
		$this->load->model('zoopkeeper/ZkopModel');
		$this->loadListByJobName(1);
	}
	function loadListByJobName($jobName){
		$query = $this->db->query('select * from appop where JobName=? and Online=1 and Status <>4',$jobName);
		if ($query->num_rows() > 0){
			$result=array();
			foreach ($query->result_array() as $row){
				array_push($result, $row);
			}
			return $result;
		}else{
			return null;
		}
	
	}
	function loadListByJobNameAndDate($jobName,$starttime,$endtime){
		$query = $this->db->query('select * from appop where JobName=? and Online=1 and Status <>4 and EffectTime>=? AND EffectTime <=?',array($jobName,$starttime,$endtime));
		if ($query->num_rows() > 0){
			$result=array();
			foreach ($query->result_array() as $row){
				array_push($result, $row);
			}
			return $result;
		}else{
			return null;
		}		
	}
	function doRollBack($jobname,$targetID,&$resultMsg){
		$query=$this->db->query("select ID from appop where Online=1 AND JobName=? order by ID desc limit 1",$jobname);
		if($query->num_rows()!=1){
			return false;
		}
		$row=$query->row();
		$currrentMaxID=$row->ID;
		if($currrentMaxID==$targetID){
			$resultMsg="要回滚到的目标与当前线上目标一致，回滚无效";
			return false;
		}
		
		$query=$this->db->query("select AppInfo,JobInfo from appop where Online=1 AND JobName=? AND ID=? limit 1",array($jobname,$targetID));
		$msg=mysql_error();
		if($query->num_rows()!=1){
			return false;
		}
		$row=$query->row();
		$appinfo=$row->AppInfo;
		$jobinfo=$row->JobInfo;
		
		$token = strtok($jobname, ".");
		$AppName=$token;
		$token = strtok(".");
		$JobName=$token;
		
		
		$zkopflag=$this->ZkopModel->SetAppAndJobInfo($AppName,$JobName,$appinfo,$jobinfo);
		if(!$zkopflag){
			$resultMsg="zoopkeeper操作失败,数据库未操作";
			return false;
		}
		
		
		$flag=$this->insertRowByID($targetID);
		if($flag){
			//档数据库插入成功后
			$resultMsg="ZoopKeeper操作成功,数据库插入成功";
			return true;
		}else{
			return false;
		}
		
	}
	function insertRowByID($ID){
		$query=$this->db->query("insert into appop(JobName,UserName,Status,Review,Online,AppInfo,JobInfo,ApprovalTime,EffectTime) select JobName,'Admin',9,1,1,AppInfo,JobInfo,now(),now() from appop where ID=?",$ID);
	    if($this->db->affected_rows()>0){
	    	return true;
	    }
	}
}

?>