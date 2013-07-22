<?php
class AppopControl extends CI_Controller{
	function  __construct(){
		parent::__construct();
	}
	function load(){
		
		$this->load->database();
		$query = $this->db->query('select ID,JobName,UserName,OpIndex,Status,SubmitTime,ApprovalTime from appop where Status in (1,2)');
		$arr=array();
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,'OpIndex'=>$row->OpIndex,
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
		$query = $this->db->query('select ID,JobName,UserName,OpIndex,Status,SubmitTime,ApprovalTime from appop where ID=?',array($ID));
		$arr=array();
		if($query->num_rows() == 1){
			foreach ($query->result() as $row){
				$arr=array('ID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,'OpIndex'=>$row->OpIndex,
				'Status'=>$row->Status,
				'SubmitTime'=>$row->SubmitTime,
				'ApprovalTime'=>$row->ApprovalTime
			
			);
			
			}
		}else{
			echo "ERROR";
		}
		$this->load->model('AppOPModel');
		$AppAndJobInfo=$this->AppOPModel->getAppInfo($ID);
		$arr['AppInfo']=$AppAndJobInfo[0];
		$arr['JobInfo']=$AppAndJobInfo[1];
		
		echo json_encode($arr);
	}
}
?>
