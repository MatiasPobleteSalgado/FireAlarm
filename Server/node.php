<?php 

	$_POST = array_merge($_POST, (array) json_decode(file_get_contents('php://input')));

	if(isset($_POST['type']))

 ?>