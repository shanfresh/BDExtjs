<?php
class CreateJob extends CI_Controller {
	function __construct()
	{
		
	 	parent::__construct();
	 	$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	 	$this->load->model('JobAbstract_model');
		
	}
	function CreateNewJob(){
		$result=$this->JobAbstract_model->CheckExists($_POST['JobName']);
		$flag=!$result;
		if($flag){
			$result=array();
			$result['success']=$flag;
			$result['msg']="当前任务名重复，可以插入";
			$result['jobappname']=$_POST['JobName'];
			echo json_encode($result);
		}else{
			$result=array();
			$result['success']=$flag;
			$result['msg']="创建JOB失败，名字重复：".$_POST['JobName'];
			echo json_encode($result);
		}
		
	}
	function CreateApp(){
		$this->load->model('AppOPModel');
		$this->load->model('JobAbstract_model');
		$result=array();
		$data=$_POST['appinfo'];
		$JobName=$_POST['jobname'];
		$UserName=$this->session->userdata('UserName');
		$arrayres=json_decode($data, true);
		$appInfoStr="";
		foreach ($arrayres as $value) {
			$appInfoStr=$appInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\n";
		}
		
		$jobInfoJson=$_POST['jobinfo'];
		$jobInfoRes=json_decode($jobInfoJson, true);
		$jobInfoStr="";
		foreach ($jobInfoRes as $value) {
			$jobInfoStr=$jobInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\n";
		}
		
		
		$result=$this->AppOPModel->insertIntoAppOP($JobName,$UserName,$appInfoStr,$jobInfoStr);
		echo $result;

	}
}
?>