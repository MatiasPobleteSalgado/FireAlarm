<?php
	if(isset($_POST)){
		$aJson = array(
				'type' => 'success', //código fijo
				'Message' => 'hello from server'
			);
		$data = json_decode(file_get_contents('php://input'), true);
		if(isset($data['value'])){
			$aJson = array(
					'type' => 'success', //código fijo
					'Message' => $data['value']
					);
		}
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($aJson);
	}
?>