<?php
class RollBackControl extends CI_Controller{
	function __construct(){
		parent::__construct();
		$phpcas_path="phpcas";
		$cas_host="itebeta.baidu.com";
		$cas_port=8100;
		$cas_context="";
		$phpcas_path="application/controllers/phpcas";
		include_once($phpcas_path.'/CAS.php');
		phpCAS::client(CAS_VERSION_2_0, $cas_host, $cas_port, $cas_context);
		phpCAS::setNoCasServerValidation();
		phpCAS::forceAuthentication();
		if (isset($_REQUEST['logout'])) {
		        phpCAS::logout();
		}
		$this->load->model('RollbackModel');
	}
	function doRollBack(){
		$toID=json_decode($_POST["ID"]);
		$jobname=json_decode($_POST["JobName"]);
		$msg;
		$flag=$this->RollbackModel->doRollBack($jobname,$toID,$msg);
		$result["success"]=$flag;
		$result["msg"]=$msg;
		echo json_encode($result);
	}
}
?>