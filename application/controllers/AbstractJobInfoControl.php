<?php
class AbstractJobInfoControl extends CI_Controller {
	function __construct()
	{
	 	parent::__construct();
	 	$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	}
	function ModifyByID(){
		$this->load->model('JobAbstract_model');
		$ID=$_POST['JobID'];
		$InputPath=$_POST['InputPath'];
		$RunCmd=$_POST['RunCmd'];
		$flag=$this->JobAbstract_model->ModifybyID($ID,$InputPath,$RunCmd);
		$result=array();
		$result['success']=$flag;
		if($flag)
			$result['msg']='修改JobInfo主表成功，需要进一步修改配置信息';
		else{
			$erro=mysql_error();
			$result['msg']='修改JobInfo主表失败，原因是'.$erro;
		}
		echo json_encode($result);
	}
}
?>