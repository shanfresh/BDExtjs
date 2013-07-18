<?php
class DeleteAbsJob extends CI_Controller {
	function __construct()
	{
	 	parent::__construct();
	 	$this->load->library('session');
	}
	function doDelete(){
		$myjsonresultTotal=json_decode($_POST['data'],true);
		$flag=true;
		foreach ($myjsonresultTotal as $myjsonresult) {
			$JobName=$myjsonresult['JobName'];
			$UserName=$this->session->userdata('UserName');
			$this->load->model('AppOPModel');
			$eachflag=$this->AppOPModel->deleteRow($JobName,$UserName);
			$flag=$flag&&$eachflag;		
		}
		
		$result=array();
		if($flag){
			$result['success']=true;
		}else{
			$result['success']=false;
		}
		echo json_encode($result);
	
	}
	
	
	
}
?>