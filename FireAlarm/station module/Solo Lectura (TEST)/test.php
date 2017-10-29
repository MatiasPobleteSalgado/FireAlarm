<?php
	if($_POST){
		try {
			$data = json_encode($_POST);//var_dump($_POST);
		} catch (Exception $e) {
			$a = 0;
		}
		$aJson = array(
						    'type' => 'success', //código fijo
						    'Message' => 'hello from server'
						);
		if(isset($data)){
			$res = stripslashes($data);
			$res = stripslashes($res);
			$res = stripslashes($res);
			$res = str_replace('\"', '', $res);
			$aJson = array(
						    'type' => 'success', //código fijo
						    'Message' => $res
						);
		}
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($aJson);
	}
?>