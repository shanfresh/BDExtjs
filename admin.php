<?php 
	include_once('authentication.php');
	if(phpCAS::getUser()=="Shanjixi2"){
		
	}else{
		header("Location: Forbidden.html");  
		exit;
	}
	
?>

<!DOCTYPE html>

<!-- Auto Generated with Sencha Architect -->
<!-- Modifications to this file will be overwritten. -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>BVC管理员页面</title>
    <script src="http://cdn.sencha.com/ext/gpl/4.2.1/ext-all-debug.js"></script>
    <link rel="stylesheet" href="http://extjs.cachefly.net/ext-4.1.1-gpl/resources/css/ext-all.css">
    <script type="text/javascript" src="admin.js"></script>
</head>

<body>
<h3 align="right">欢迎您:<?php echo phpCAS::getUser(); ?>  &nbsp&nbsp<a href="?logout=">登出</a></h3>
<div id="content" width="100%" align="center">
<div id="adminpanel"></div>
</body>
</html>