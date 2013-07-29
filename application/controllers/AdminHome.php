<?php
class AdminHome extends CI_Controller{
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
	}
	
	
	function index()
	{
		if($this->verify(phpCAS::getUser())){
			$this->load->view('admin');
		}else{
			header("Location: Forbidden.php");  
			exit;
		}
		
	}
	function verify(){
		$name=phpCAS::getUser();
		$this->load->database();
		$this->db->where('name =',$name);
		$query=$this->db->get('admin');
		$query_rs=$query->result_array();
		if(count($query_rs)==1){
			return true;
		}else{
			return false;
		}
	}
	
}