<?php
	class AppOPModel extends CI_Model {
	    function __construct()
	    {
	        parent::__construct();
	    }
	    /*
	     * $OPIndex 需要自动的获取最大值
	     * $Status 如果判断成功的话为默认值插入状态1：
	     * $
	     */
	    function insertIntoAppOP($JobName,$UserName,$AppInfo,$JobInfo){
	    	$this->load->database();
	    	$data = array(
               'JobName' => $JobName,
               'UserName' => $UserName,
               'Status'=>1,
    		   'AppInfo'=>$AppInfo,
    		   'JobInfo'=>$JobInfo
        	);
        	$this->db->insert('appop', $data);
	    	if($this->db->affected_rows()>0){
				return true;
			}else{
				return false;
			}
        	
	    	
	    }


	    function deleteRow($JobName,$UserName){
	    	$this->load->database();
	    	
	    	$result=$this->db->query("select count(*) as totalcount from appop where JobName=? AND UserName=?",array($JobName,$UserName));
	    	$row = $result->row_array(); 
	    	if($row['totalcount']==0){
	    		echo "TotalCount==0";
	    		return false;
	    	}
	    	$this->db->query("lock TABLES appop WRITE,appop as t1 WRITE");
	    	$this->db->query("INSERT into appop (JobName,UserName,Status,AppInfo,JobInfo,SubmitTime) (select JobName,UserName,4,AppInfo,JobInfo,SubmitTime from appop AS t1 where JobName=? AND UserName=?);",array($JobName,$UserName));
	    	if($this->db->affected_rows()>0){
	    		$this->db->query("unlock tables");
	    		return true;
			}else{
				echo "erroe reason".mysql_error()."_".$JobName."_".$UserName;
				$this->db->query("unlock tables");
				return false;
			}
			$this->db->query("FLUSH TABLES");	    	
	    }
	    function getAppAndJobInfo($ID){
	    	$this->load->database();
	    	$result=array();
	    	$query=$this->db->query("select AppInfo,JobInfo from appop where ID=?",array($ID));
	    	$row = $query->row();
	    	$appinfoText=$row->AppInfo;
	    	$jobinfoText=$row->JobInfo;
	    	$appinfo=$this->CastFromStrToArray($appinfoText);
	    	$jobInfo=$this->CastFromStrToArray($jobinfoText);
			array_push($result, $appinfo);
			array_push($result, $jobInfo);
			return $result;
			
	    	
	    }
	    function CastFromStrToArray($string){
			$result=array();
	    	$tok = strtok($string, "\n\r");
			while ($tok !== false) {
    			
    			$eacharray=explode(" ",$tok);
    			$each=array("Name"=>$eacharray[0],"Type"=>$eacharray[1],"Value"=>$eacharray[2]);
    			array_push($result,$each);
    			$tok = strtok("\n\r");
			}
			return $result;
	    }
	    
	    function MarkAsApproval($JobNames,$UserName){
	    	$this->load->database();
	    	$this->db->query("lock TABLES appop WRITE,appop as t1 WRITE");
	    	foreach ($JobNames as $eachJobName){
	    		$query=$this->db->query("INSERT into appop (JobName,UserName,Status,AppInfo,JobInfo,SubmitTime) (select JobName,UserName,3,AppInfo,JobInfo,SubmitTime from appop AS t1 where JobName=? and UserName=? order by OpIndex desc limit 1",array($eachJobName,$UserName));
	    		if($this->db->affected_rows()<0){
	    			$this->db->query("unlock tables");
	    			$this->db->query("FLUSH TABLES");
	    			return false;
	    		}
	    	}
	    	$this->db->query("unlock tables");
	    	$this->db->query("FLUSH TABLES");			    	
	    }
	    
	    
	}

?>