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
		
	}
}
?>