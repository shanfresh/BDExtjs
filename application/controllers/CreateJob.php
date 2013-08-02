<?php
class CreateJob extends CI_Controller {
	function __construct()
	{
		
	 	parent::__construct();
	 	$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	}
	function CreateNewJob(){
		$this->load->model('JobAbstract_model');
		//$result=$this->JobAbstract_model->InsertInto($_POST['JobName'],$_POST['JobGuarantee'],$_POST['InputPath'],$_POST['RunCmd']);
		$result[0]=true;
		$flag=true;
		$NewID=1;
		$jobappname=$_POST["JobName"];
		if($flag){
			$result=array();
			$result['success']=$flag;
			$result['msg']="成功创建JOB";
			$result['jobappname']=$jobappname;
			echo json_encode($result);
		}else{
			$result=array();
			$result['success']=$flag;
			$result['msg']="创建JOB失败".mysql_errno()." ".mysql_error();
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
			$appInfoStr=$appInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\r";
		}
		
		$jobInfoJson=$_POST['jobinfo'];
		$jobInfoRes=json_decode($jobInfoJson, true);
		$jobInfoStr="";
		foreach ($jobInfoRes as $value) {
			$jobInfoStr=$jobInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\r";
		}
		
		
		$result=$this->AppOPModel->insertIntoAppOP($JobName,$UserName,$appInfoStr,$jobInfoStr);
		echo $result;

	}
}
?>
