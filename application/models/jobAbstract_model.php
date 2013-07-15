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
    
    
    
    
    
    
    
    
    
    
    
    
    
    function get_last_ten_entries()
    {
        $query = $this->db->get('entries', 10);
        return $query->result();
    }

    function insert_entry()
    {
        $this->title   = $_POST['title']; // 请阅读下方的备注
        $this->content = $_POST['content'];
        $this->date    = time();

        $this->db->insert('entries', $this);
    }

    function update_entry()
    {
        $this->title   = $_POST['title'];
        $this->content = $_POST['content'];
        $this->date    = time();

        $this->db->update('entries', $this, array('id' => $_POST['id']));
    }

}

?>