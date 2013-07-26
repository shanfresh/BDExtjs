<?php 
	include_once('authentication.php');
	
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>用户页面</title>
 	<script src="http://cdn.sencha.com/ext/gpl/4.2.1/ext-all-debug.js"></script>
    <link rel="stylesheet" href="http://cdn.sencha.com/ext/gpl/4.2.1/resources/ext-theme-classic/ext-theme-classic-all.css">
    <script type="text/javascript" src="app.js"></script>
</head>
<body width="100%">
	<h3 align="right">欢迎您:<?php echo phpCAS::getUser(); ?> &nbsp&nbsp<a href="?logout=">登出</a></h3>
	<div id="content" width="100%">
</div>
</body>
</html>