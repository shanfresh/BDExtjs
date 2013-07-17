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
	    	$LastRow=$this->LoadLastRow($JobName,$UserName);
	    	if($LastRow==null){
	    		$LastOpIndex=0;
	    	}else{
	    		$LastOpIndex=$LastRow['OpIndex'];
	    	}
    		
    		
	    	$data = array(
               'JobName' => $JobName,
               'UserName' => $UserName,
               'OpIndex' => $LastOpIndex+1,
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
	    function LoadLastRow($JobName,$UserName){
	    	$query = $this->db->query("SELECT * FROM appop WHERE JobName = ? AND UserName = ? AND OpIndex=(Select max(OpIndex) from appop WHERE JobName=? AND UserName=?)",
	    								array($JobName,$UserName,$JobName,$UserName));
	    								
	    	if($query==null){
	    		return null;
	    	}
    		$row = $query->row_array();
    		return $row;
	    }

	    
	}

?>