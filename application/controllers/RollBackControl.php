<?php
class RollBackControl extends CI_Controller{
	function __construct(){
		parent::__construct();
	}
	function loadRollbackList(){
		$jobName=$_GET("page");
		$this->load->model("RollbackModel");
		
		
	}
}
?>