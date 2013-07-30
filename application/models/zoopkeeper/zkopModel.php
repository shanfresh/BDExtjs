<?php
class ZkopModel extends CI_Model{
	var $path="sh /home/work/lamp/apache/htdocs/tools/am_client/bin/am_client.sh ";
	var $tempDir="/tmp/";
	function __construct(){
		parent::__construct();
	}
	function LoadAppInfo($appname,&$filename,&$filecontent){
		$temp=$this->tempDir;
		$filename=$temp.$appname."[".time()."].txt";
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
	
	
}
