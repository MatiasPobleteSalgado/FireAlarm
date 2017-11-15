<?php 
	//- require("/lib/session.php");

	require_once("lib/login.php");
	require_once("lib/notificationService.php");
	require_once("lib/session.php");

	header('Access-Control-Allow-Origin: *');

	if(isset($_POST["type"])){
		switch ($_POST["type"]) {
			case 'login':
				if(isset($_POST["email"]) && isset($_POST["passwd"])){
					$user = Login::getLogin($db, $_POST["email"], $_POST["passwd"]);
					if($user == NULL){
						echo '{"error": "Wrong Credentials"}';
						break;
					}
				}
				Session::start($user);
				echo $user;
				break;
			case 'getNotifications':
				Session::check();
				$notifications = NotificationService::getNotifications($db, $_POST["last"]);
				echo $notifications;
				break;
			case 'session':
				if (isset($_SESSION['user'])) {
		            echo '{"type":"session","value":1}';
		        }
		        else {
		            echo '{"type":"session","value":0}';
		        }
				break;
			default:
				header("index.php"); // esto prontamente nos traera problemas
		}
	}
	else{
		header("index.php"); // aqui igual
	}
?>