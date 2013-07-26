<?php
class UserRolesVerify extends CI_Controller{
	function __construct(){
		parent::__construct();
	}
	function doVerify($userName){
		if($userName=="Shanjixi"){
			
		}else{
			$this->load->view("Forbidden");
		}
	}
}