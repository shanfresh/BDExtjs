<?php
class ZkControl extends CI_Controller{
	function __construct(){
		parent::__construct();
	}
	function LoadAppbyName($appname="tieba-ocr-pic"){
		$this->load->model("zoopkeeper/ZkopModel");
		$filename;
		$content;
		$flag=$this->ZkopModel->LoadAppInfo($appname,$filename,$content);
		if($flag){
			echo "success";
		}else {
			echo "failed";
			echo $content;
		}

		
	}
	function LoadJobbyName($appname="tieba-ocr-pic",$jobname="run-ocr-pic"){
		
	}
}
?>