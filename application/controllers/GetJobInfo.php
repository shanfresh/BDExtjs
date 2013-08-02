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
	 	$this->load->model("zoopkeeper/ZkopModel");	 	
	}
	function AppInfo(){
		$appname=$_GET['page'];
		$filename;
		$filecontent;
		$arr=array();
		$flag=$this->ZkopModel->LoadAppInfo($appname,$filename,$filecontent);
		if($flag){
			$file = fopen($filename,"r") or exit("Unable to open file!");;
			while(!feof($file))
	  		{
	  			$eachline=fgets($file);
	  			$eachLineArray=array();
	  			$lastPosition=0;
	  			$newPosition=-1;
	  			for($i=0;$i<2;$i++){
	  				$newPosition=stripos($eachline," ",$lastPosition);
	  				if(!$newPosition){
	  					break;
	  				}
	  				$eachWord=substr($eachline,$lastPosition,$newPosition-$lastPosition);
	  				array_push($eachLineArray, $eachWord);
	  				$lastPosition=$newPosition+1;
	  			}	  			
	  			if(strlen($eachline)<10){
	  				break;
	  			}
	  			$endWord=substr($eachline,$lastPosition);
	  			$temp=array();
				$temp['Name']=$eachLineArray[0];
				$temp['Type']=$eachLineArray[1];
				$temp['Value']=trim($endWord);
				array_push($arr, $temp);
			}
  			fclose($file);
			echo json_encode($arr);
		}
	}
	function JobInfo(){
		return;
		$appname=$_GET['appname'];
		$jobname=$_GET['jobname'];
		$filename;
		$filecontent;
		$arr;
		$flag=$this->ZkopModel->LoadJobInfo($appname,$jobname,$filename,$filecontent);
		if($flag){
			$file = fopen($filename,"r") or exit("Unable to open file!");;
			while(!feof($file))
	  		{
	  			$eachline=fgets($file);
	  			$eachLineArray=array();
	  			$lastPosition=0;
	  			$newPosition=-1;
	  			for($i=0;$i<2;$i++){
	  				$newPosition=stripos($eachline," ",$lastPosition);
	  				if(!$newPosition){
	  					break;
	  				}
	  				$eachWord=substr($eachline,$lastPosition,$newPosition-$lastPosition);
	  				array_push($eachLineArray, $eachWord);
	  				$lastPosition=$newPosition+1;
	  			}	  			
	  			if(strlen($eachline)<10){
	  				break;
	  			}
	  			$endWord=substr($eachline,$lastPosition);
	  			$temp=array();
				$temp['Name']=$eachLineArray[0];
				$temp['Type']=$eachLineArray[1];
				$temp['Value']=trim($endWord);
				array_push($arr, $temp);
				
  			}
  			fclose($file);
			echo json_encode($arr);
		}
	}
	function AppInfo_Old()
	{
		$arr=array();
		$file = fopen("TemplateFile/First.txt","r") or exit("Unable to open file!");;
		while(!feof($file))
  		{
  			$eachline=fgets($file);
  			$eachLineArray=array();
  			$lastPosition=0;
  			$newPosition=-1;
  			for($i=0;$i<2;$i++){
  				$newPosition=stripos($eachline," ",$lastPosition);
  				$eachWord=substr($eachline,$lastPosition,$newPosition-$lastPosition);
  				array_push($eachLineArray, $eachWord);
  				$lastPosition=$newPosition+1;
  			}
  			
  			$endWord=substr($eachline,$lastPosition);
  			$temp=array();
			$temp['Name']=$eachLineArray[0];
			$temp['Type']=$eachLineArray[1];
			$temp['Value']=trim($endWord);
			array_push($arr, $temp);
  		}
		fclose($file);

		echo json_encode($arr);
	}
	function JobInfo_Old()
	{
		$arr=array();
		$file = fopen("TemplateFile/Second.txt","r") or exit("Unable to open file!");;
		while(!feof($file))
  		{
  			$eachline=fgets($file);
  			$eachLineArray=array();
  			$lastPosition=0;
  			$newPosition=-1;
  			for($i=0;$i<2;$i++){
  				$newPosition=stripos($eachline," ",$lastPosition);
  				$eachWord=substr($eachline,$lastPosition,$newPosition-$lastPosition);
  				array_push($eachLineArray, $eachWord);
  				$lastPosition=$newPosition+1;
  			}
  			
  			$endWord=substr($eachline,$lastPosition);
  			
  			
  			$temp=array();
			$temp['Name']=$eachLineArray[0];
			$temp['Type']=$eachLineArray[1];
			$temp['Value']=trim($endWord);
			array_push($arr, $temp);
  		}
		fclose($file);
		echo json_encode($arr);
	}
	function index(){
		$this->load->database();
		$query = $this->db->query('select job_id,job_name,job_guarantee,input_path,run_cmd from jobinfo order by job_id desc');
		$arr=array();
		foreach ($query->result() as $row)
		{
			$arr2 = array ('ID'=>$row->job_id,'JobID'=>$row->job_id,'JobName'=>$row->job_name,'JobGuarantee'=>$row->job_guarantee,'InputPath'=>$row->input_path,'RunCmd'=>$row->run_cmd);
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	}
	function userJob(){
		$this->load->database();
		$username=$this->session->userdata("UserName");
		$query = $this->db->query('SELECT ID,job_id,JobName,UserName,Status,AppInfo,JobInfo,SubmitTime,ApprovalTime,EffectTime FROM appop,jobinfo where appop.UserName=? AND appop.JobName=jobinfo.job_name AND ID in (select max(id) from appop group by JobName) order by job_id desc',$username);
		$arr=array();
		$this->load->model("AnalysePathAndCmd");
		foreach ($query->result() as $row)
		{
			$eacharray=$this->AnalysePathAndCmd->analyse($row->JobInfo);
			$inputpath=$eacharray['input_dir'];
			$cmd=$eacharray['cmd'];
			$arr2 = array ('JobID'=>$row->job_id,'AppopID'=>$row->ID,'JobName'=>$row->JobName,'UserName'=>$row->UserName,'Status'=>$row->Status,'InputPath'=>$inputpath,'RunCmd'=>$cmd,'ApprovalTime'=>$row->ApprovalTime,'EffectTime'=>$row->EffectTime,'SubmitTime'=>$row->SubmitTime);
			array_push($arr, $arr2);
		}
		echo json_encode($arr);
	}
	function loadAppAndJobDetailbyId(){
		
	}
}
?>
