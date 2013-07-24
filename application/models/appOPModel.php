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
    			$newPosition=-1;
    			$lastPosition=0;
    			$eachLineArray=array();
    			$eachline=$tok;
    			for($i=0;$i<2;$i++){
    				$newPosition=stripos($eachline," ",$lastPosition);
    				$eachWord=substr($eachline,$lastPosition,$newPosition-$lastPosition);
  					array_push($eachLineArray, $eachWord);
  					$lastPosition=$newPosition+1;
    			}
    			$endWord=substr($eachline,$lastPosition);
    			array_push($eachLineArray,$endWord);
    			$each=array("Name"=>$eachLineArray[0],"Type"=>$eachLineArray[1],"Value"=>$eachLineArray[2]);
    			array_push($result,$each);
    			$tok = strtok("\n\r");
			}
			return $result;
	    }
	    
	    function MarkAsApproval($JOBIDS){
	    	$this->load->database();
	    	$result=array();
	    	$this->db->query("lock TABLES appop WRITE,appop as t1 READ");
	    	foreach ($JOBIDS as $JobID){
	    		$query=$this->db->query("insert into appop(JobName,UserName,Status,AppInfo,JobInfo,SubmitTime,ApprovalTime) select JobName,UserName,3,AppInfo,JobInfo,SubmitTime,now() from appop as t1 where ID=?",$JobID);
	    		if($this->db->affected_rows()<0){
	    			$result['Msg']=mysql_error();
	    			$this->db->query("unlock tables");
	    			$this->db->query("FLUSH TABLES");
	    			$result['success']=false;
	    		}
	    	}
	    	$this->db->query("unlock tables");
	    	$this->db->query("FLUSH TABLES");
	    	$result['success']=true;
	    	return $result;			    	
	    }
	    
	    function MarkAsOnline($JOBIDS){
	    	$this->load->database();
	    	$result=array();
	    	$this->db->query("lock TABLES appop WRITE,appop as t1 READ");
	    	foreach ($JOBIDS as $JobID){
	    		$query=$this->db->query("insert into appop(JobName,UserName,Status,AppInfo,JobInfo,SubmitTime,ApprovalTime,EffectTime) select JobName,UserName,5,AppInfo,JobInfo,SubmitTime,ApprovalTime,now() from appop as t1 where ID=?",$JobID);
	    		if($this->db->affected_rows()<0){
	    			$result['Msg']=mysql_error();
	    			$this->db->query("unlock tables");
	    			$this->db->query("FLUSH TABLES");
	    			$result['success']=false;
	    		}
	    	}
	    	$this->db->query("unlock tables");
	    	$this->db->query("FLUSH TABLES");
	    	$result['success']=true;
	    	return $result;			    	
	    }
	}

?>