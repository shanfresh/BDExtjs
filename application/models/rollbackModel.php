<?php
class RollbackModel extends CI_Model{
	function __construct(){
		parent::__construct();
		$this->load->database();
		$this->loadListByJobName(1);
	}
	function loadListByJobName($jobName){
		$query = $this->db->query('select * from appop where JobName=? and Online=1 and Status <>4',$jobName);
		if ($query->num_rows() > 0){
			$result=array();
			foreach ($query->result_array() as $row){
				array_push($result, $row);
			}
			return $result;
		}else{
			return null;
		}
	
	}
	
}

?>