<?php
class CreateJob extends CI_Controller {
	function __construct()
	{
		
	 	parent::__construct();
	}
	function CreateNewJob(){
		$this->load->model('JobAbstract_model');
		$result=$this->JobAbstract_model->InsertInto($_POST['JobName'],$_POST['JobGuarantee'],$_POST['InputPath'],$_POST['RunCmd']);
		$flag=$result[0];
		$NewID=$result[1];
		if($flag){
			$result=array();
			$result['success']=$flag;
			$result['msg']="成功创建JOB";
			$result['newRecordID']=$NewID;
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
		$id=intval($_POST['newID']);
		$arrayres=json_decode($data, true);
		$appInfoStr="";
		foreach ($arrayres as $value) {
			$appInfoStr=$appInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\r\n";
		}
		
		$jobInfoJson=$_POST['jobinfo'];
		$jobInfoRes=json_decode($jobInfoJson, true);
		$jobInfoStr="";
		foreach ($jobInfoRes as $value) {
			$jobInfoStr=$jobInfoStr.$value['Name']." ".$value['Type']." ".$value['Value']."\r\n";
		}
		
		$jobinforow=$this->JobAbstract_model->LoadTheJobInfoByID($id);
		$result=$this->AppOPModel->insertIntoAppOP($jobinforow['job_name'],'Shanjixi',$appInfoStr,$jobInfoStr);
		echo $result;

	}
}
?>