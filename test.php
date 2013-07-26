<?php
$phpcas_path="phpcas";
$cas_host="itebeta.baidu.com";
$cas_port=8100;
$cas_context="";
$phpcas_path="application/controllers/phpcas";
include_once($phpcas_path.'/CAS.php');
phpCAS::client(CAS_VERSION_2_0, $cas_host, $cas_port, $cas_context);
phpCAS::setNoCasServerValidation();
phpCAS::forceAuthentication();
if (isset($_REQUEST['logout'])) {
        phpCAS::logout();
}


?>

<html>
  <head>
    <title>PHP客户端自定义登录页面</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF8" />    
  </head>
  <body>
  <h1>PHP客户端自定义登录页面</h1>
<?php if (phpCAS::isAuthenticated()) { ?>
   <div>您正在使用的帐户为：<?php echo phpCAS::getUser(); ?></div>
   <div><br>
   <a href='?logout' >[安全退出]</a></div>
<?php } else { ?>
    <div id="login_div">
      <form id="myLoginForm" action="<?php echo $casServerLoginUrl ?>" method="post">
        <input type="hidden" id="service" name="service" value="<?php echo $serviceUrl ?>">
        <input type="hidden" name="loginUrl" value="<?php echo $loginUrl ?>">
        <input type="hidden" name="submit" value="true" />
        <div>
               <label>用户名: <input type="text" name="username"></label>
            <label>密  码: <input type="password" name="password"></label>
           <label><input name="rememberMe" value="true" type="checkbox"/> 记住登录状态 </label>
        </div>
        <input type="submit" value="登录" />
      </form>
    </div>
    </body>
</html>
<?php }
?>
