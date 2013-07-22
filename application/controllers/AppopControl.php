<?php
class AppopControl extends CI_Controller{
	function  __construct(){
		parent::__construct();
		$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	}
	function load(){
		
		$this->load->database();
		$query = $this->db->query('select * from appop where ID in(select max(ID) from appop group by JobName) AND status in(1,2)');
		$arr=array();
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,
			'Status'=>$row->Status,
			'SubmitTime'=>$row->SubmitTime,
			'ApprovalTime'=>$row->ApprovalTime			
			);
			
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	
	}
	function loadById(){
		$this->load->database();
		$ID=json_decode($_POST['ID']);
		$JobName=json_decode($_POST['jobname']);
		$query = $this->db->query('select ID,JobName,UserName,Status,SubmitTime,ApprovalTime from appop where ID=?',array($ID));
		$arr=array();
		if($query->num_rows() == 1){
			foreach ($query->result() as $row){
				$arr=array('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,
				'Status'=>$row->Status,
				'SubmitTime'=>$row->SubmitTime,
				'ApprovalTime'=>$row->ApprovalTime
			
			);
			
			}
		}else{
			echo "ERROR";
		}
		$this->load->model('AppOPModel');
		$AppAndJobInfo=$this->AppOPModel->getAppAndJobInfo($ID);
		$arr['AppInfo']=$AppAndJobInfo[0];
		$arr['JobInfo']=$AppAndJobInfo[1];
		
		echo json_encode($arr);
	}
	//通过多个申请单据
	function passbyIDs(){
		$ID=json_decode($_POST['ID']);
		$JobName=json_decode($_POST['jobname']);
		
		
		
	}
}
?>
