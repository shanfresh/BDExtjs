<?php
class GetJobInfo extends CI_Controller {
	
	/*
	 *  fixed_grp NUM 1
		grp_rule STR unit_0=1-999
		init_grp_num NUM 307
		max_server_num NUM 50
		scheduler STR CsScheduler

	 */
	function __construct()
	{
		
		
	 	parent::__construct();
	 	$this->load->library('session');
	 	$this->session->set_userdata('UserName', 'Shanjixi');
	}
	function AppInfo()
	{
		$arr=array();
		$file = fopen("TemplateFile/First.txt","r") or exit("Unable to open file!");;
		while(!feof($file))
  		{
  			$eachline=fgets($file);
  			$eachLineArray=array();
  			$token = strtok($eachline, " ");  			
			while ($token !== false)
  			{
  				array_push($eachLineArray, $token);
  				$token = strtok(" ");
  			}
  			$temp=array();
			$temp['Name']=$eachLineArray[0];
			$temp['Type']=$eachLineArray[1];
			$temp['Value']=trim($eachLineArray[2]);
			array_push($arr, $temp);
  		}
		fclose($file);

		echo json_encode($arr);
	}
	function JobInfo()
	{
		$arr=array();
		$file = fopen("TemplateFile/Second.txt","r") or exit("Unable to open file!");;
		while(!feof($file))
  		{
  			$eachline=fgets($file);
  			$eachLineArray=array();
  			$token = strtok($eachline, " ");  			
			while ($token !== false)
  			{
  				array_push($eachLineArray, $token);
  				$token = strtok(" ");
  			}
  			$temp=array();
			$temp['Name']=$eachLineArray[0];
			$temp['Type']=$eachLineArray[1];
			$temp['Value']=trim($eachLineArray[2]);
			array_push($arr, $temp);
  		}
		fclose($file);
		echo json_encode($arr);
	}
	function index(){
		$this->load->database();
		$query = $this->db->query('select job_id,job_name,job_guarantee,input_path,run_cmd from jobinfo order by job_id desc limit 10');
		$arr=array();
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->job_id,'JobID'=>$row->job_id,'JobName'=>$row->job_name,'JobGuarantee'=>$row->job_guarantee,'InputPath'=>$row->input_path,'RunCmd'=>$row->run_cmd);
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	}
}
?>