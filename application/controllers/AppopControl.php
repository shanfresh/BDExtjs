<?php
class AppopControl extends CI_Controller{
	function  __construct(){
		parent::__construct();
		$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	 	$this->load->model("zoopkeeper/ZkopModel");
	}
	function load(){
		
		$this->load->database();
		$query = $this->db->query('select * from appop where ID in(select max(ID) from appop WHERE Review=0 group by JobName) order by ID desc ');
		$arr=array();
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,
			'Status'=>$row->Status,
			'SubmitTime'=>$row->SubmitTime,
			'ApprovalTime'=>$row->ApprovalTime			
			);
			
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	
	}
	function loadById(){
		$this->load->database();
		$ID=json_decode($_POST['ID']);
		$query = $this->db->query('select ID,JobName,UserName,Status,SubmitTime,ApprovalTime from appop where ID=?',array($ID));
		$arr=array();
		if($query->num_rows() == 1){
			foreach ($query->result() as $row){
				$arr=array('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,
				'Status'=>$row->Status,
				'SubmitTime'=>$row->SubmitTime,
				'ApprovalTime'=>$row->ApprovalTime
			
			);
			
			}
		}else{
			echo "ERROR";
		}
		$this->load->model('AppOPModel');
		$AppAndJobInfo=$this->AppOPModel->getAppAndJobInfo($ID);
		$arr['AppInfo']=$AppAndJobInfo[0];
		$arr['JobInfo']=$AppAndJobInfo[1];
		
		echo json_encode($arr);
	}

	
	function loadPassed(){
		$this->load->database();
		//$query = $this->db->query('select * from appop where ID in(select max(ID) from appop group by JobName) AND status=3');
		$query = $this->db->query('select * from appop where ID in (select max(ID) from appop where Review=1 AND Online=0 group by JobName) order by ID desc');
		$arr=array();
		if($query->num_rows()==0){
			echo json_encode($arr);
		}
		
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,
			'Status'=>$row->Status,
			'SubmitTime'=>$row->SubmitTime,
			'ApprovalTime'=>$row->ApprovalTime			
			);
			
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	}
	//通过多个申请单据
	function MarkAsPassed(){
		$this->load->database();
		$IDs=json_decode($_POST['ID']);
		$this->load->model('AppOPModel');
		$result=$AppAndJobInfo=$this->AppOPModel->MarkAsApproval($IDs);	
		echo json_encode($result);
	}
	function loadOnline(){
		$this->load->database();
		$query = $this->db->query('select * from appop where ID in(select max(ID) from appop WHERE Review=1 AND Online=1 group by JobName) order by ID desc');
		$arr=array();
		if($query->num_rows()==0){
			echo json_encode($arr);
		}
		
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,
			'Status'=>$row->Status,
			'SubmitTime'=>$row->SubmitTime,
			'ApprovalTime'=>$row->ApprovalTime,
			'EffectTime'=>$row->EffectTime				
			);
			
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	}
	//通过多个申请单据,所有值赋值为1，表明上线了，但没有ZoopKeeper相关操作
	function MarkAsOnline(){
		$this->load->database();
		$IDs=json_decode($_POST['ID']);
		$this->load->model('AppOPModel');
		$this->load->model('AppOPModel');
		
		$result=$AppAndJobInfo=$this->AppOPModel->MarkAsOnline($IDs);
		$ZKresult;
		
		$sum=$this->AppOPModel->loadByIds($IDs);
		$executeResult=array();
		$index=0;
		$executeResult;
		$sumflag=true;
		foreach ($sum as $value) {
			$JobAppName=$value['JobName'];
			$token = strtok($JobAppName, ".");
			$AppName=$token;
			$token = strtok(".");
			$JobName=$token;
			$appinfo=$value['AppInfo'];
			$jobinfo=$value['JobInfo'];
			$flag=$this->ZkopModel->SetAppAndJobInfo($JobName,$AppName,$appinfo,$jobinfo);
			$executeResult[$index]=array('ID'=>$value['ID'],'Flag'=>$flag);
			$sumflag=$sumflag&&$flag;
		}
		$ZKresult['success']=$sumflag;
		$ZKresult['executeResult']=$executeResult;			
		$totalresult=array();
		foreach ($executeResult as $value) {
			if($value['Flag']){
				$result=$AppAndJobInfo=$this->AppOPModel->MarkAsOnline(array($value['ID']));
			}else{
				$result=false;
			}
			array_push($totalresult,$result);
		}
		
	
		echo json_encode($ZKresult);
	}
	
	function UserModifyByJobName(){
		$this->load->model('UserAppopModel');
		$JobName=json_decode($_POST['JobName']);
		$AppInfo=$_POST['AppInfo'];
		$JobInfo=$_POST['JobInfo'];
		$arrayres=json_decode($AppInfo, true);
		$appInfoStr="";
		foreach ($arrayres as $value) {
			$appInfoStr=$appInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\r\n";
		}
		$arrayres2=json_decode($JobInfo, true);
		$jobInfoStr="";
		foreach ($arrayres2 as $value) {
			$jobInfoStr=$jobInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\r\n";
		}
	
		
		$UserName=$this->session->userdata('UserName');
		$result=$this->UserAppopModel->UserModify($JobName,$UserName,$appInfoStr,$jobInfoStr);
		echo json_encode($result);
	}
}
?>
