<?php
class ZkopModel extends CI_Model{
//	var $path="sh /home/work/lamp/apache/htdocs/tools/am_client/bin/am_client.sh ";
	var $path="cd /home/work/lamp/apache/htdocs/tools/am_client/bin/ && sh am_client.sh ";
	var $tempDir="/home/work/lamp/apache/htdocs/FirstTry/tmp/";
	//my is lowercase
//    var $path="Tools/am_client.sh ";
//	var $tempDir="c:/windows/Temp/";
	
	function __construct(){
		parent::__construct();
		$this->load->helper('file');
	}
	function LoadAppInfo($appname,&$filename,&$filecontent){
		$temp=$this->tempDir;
		$filename=$this->getAppTempFile($appname);
		$cmd=($this->path)."GET_APP_INFO ".$appname." >".$filename;
		system($cmd,$resultvalue);
		if(file_exists($filename)){
			$filecontent=fopen($filename,"r");
		}else{
			$filecontent="NULL";
		}
		if($resultvalue==0){
			return true;
		}else{
			return false;
		}
	}
	function LoadJobInfo($appname,$jobname,&$filename,&$filecontent){
		$temp=$this->tempDir;
		$filename=$this->getAppTempFile($appname);
		$cmd=($this->path)."GET_JOB_INFO ".$appname." ".$jobname." ".">".$filename;
		system($cmd,$resultvalue);
		if(file_exists($filename)){
			$filecontent=fopen($filename,"r");
		}else{
			$filecontent="NULL";
		}
		if($resultvalue==0){
			return true;
		}else{
			return false;
		}
	}
	function getAppTempFile($appname="bvc_app_null"){
		$temp=$this->tempDir;
		$datastr=date("Y-m-d-H-i-s",time());
		$filename=$temp.$appname."_".$datastr."_.txt";
		return $filename;
	}
	function SetAppAndJobInfo($appname,$jobname,$appinfo,$jobinfo){
		if(!$this->SetAppInfo($appname,$appinfo)){
			return false;
		}
		if(!$this->SetJobInfo($appname,$jobname,$jobinfo)){
			return false;
		}
		return true;
	}
	function SetAppInfo($appname,$appinfo){
		if($appname===""){
			echo "appname==null";
			return false;
		}
		$fileName=$this->getAppTempFile($appname);
		if (!write_file($fileName, $appinfo)){
			return false;
		}
		$cmd=($this->path)."SET_APP_INFO ".$appname." ".$fileName;
		system($cmd,$resultvalue);
		$resultvalue=0;
		if($resultvalue!=0)
			return false;
		else
			return true;		
	}
	function SetJobInfo($appname,$jobname,$jobinfo){
		if($appname===""){
			echo "appname==null";
			return false;
		}
		$fileName=$this->getAppTempFile($appname);
		if (!write_file($fileName, $jobinfo)){
			return false;
		}
		$cmd=($this->path)."SET_JOB_INFO ".$appname." ".$jobname." ".$fileName;
		system($cmd,$resultvalue);
		$resultvalue=0;
		if($resultvalue!=0)
			return false;
		else
			return true;		
	}
	
}
