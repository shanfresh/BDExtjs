<?php
class AnalysePathAndCmd extends CI_Model {
	function __construct(){
		parent::__construct();
		$this->load->model('AppOPModel');
	}
	function analyse($string){
		$result=array();
		$arrayString=$this->AppOPModel->CastFromStrToArray($string);
		foreach ($arrayString as $value) {
			if($value['Name']=="cmd"){
				$result['cmd']=$value['Value'];
			}elseif ($value['Name']=="input_dir"){
				$result['input_dir']=$value['Value'];
			}
		}
		if(count($result)<2){
			return null;
		}else{
			return $result;
		}
			
	}
}
?>