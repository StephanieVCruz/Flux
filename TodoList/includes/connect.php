<?php
	$server = "localhost";
	$db_name = "st437983";
	$db_user = "st437983";
	$db_pass = "Clueless1!";


	mysql_connect($server, $db_user, $db_pass) or die("Could not connect to server!");
	mysql_select_db($db_name) or die("Could not connect to database!");
?>
