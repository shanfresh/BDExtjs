<?php
class UserAppopModel extends CI_Model {
	function __construct(){
		parent::__construct();
		$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	}
	function UserModify($JobName,$UserName,$AppInfo,$JobInfo) {
		$this->load->database();
		$queryresult=$this->db->query("Insert into appop(JobName,UserName,Status,AppInfo,JobInfo,SubmitTime) values(?,?,2,?,?,now())",array($JobName,$UserName,$AppInfo,$JobInfo));
		$result=array();
		if($this->db->affected_rows()>0){
			$result['success']=true;
		}else{
			$result['success']=false;
			$result['msg']=$this->db->_error_message();
		}
		return $result;       	
	}
	
}
?>