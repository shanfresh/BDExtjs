<?php
class JobAbstract_model extends CI_Model {

    var $title   = '';
    var $content = '';
    var $date    = '';

    function __construct()
    {
        parent::__construct();
    }

    function InsertInto($Job_name,$JobGuarantee,$InputPath,$RunCmd){
    	$this->load->database();
    	$data = array(
               'job_name' => $Job_name,
               'job_guarantee' => $JobGuarantee,
               'input_path' => $InputPath,
               'run_cmd' => $RunCmd
        );

		$this->db->insert('jobinfo ', $data); 
		$newRecordID=mysql_insert_id();
		if($this->db->affected_rows()>0){
			return array(true,$newRecordID);
		}else{
			return array(false,$newRecordID);
		}
    	return array(false,-1);;
    }
    
    /*
     * 根据ID返回行
     */
	function LoadTheJobInfoByID($ID){
	  	$this->load->database();
    	$query2=$this->db->query("SELECT * FROM jobinfo WHERE job_id=?",array($ID));
    	if($query2->num_rows() > 0){
    		$row = $query2->row_array();
    	}else{
    		return null;
    	}    	
    	return $row;
	}    
    
	
	

}

?>