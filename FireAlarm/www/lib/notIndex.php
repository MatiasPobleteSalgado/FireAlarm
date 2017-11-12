<?php
	//$_POST = file_get_contents('php://input'); 
	$_POST = array_merge($_POST, (array) json_decode(file_get_contents('php://input')));
	if($_POST){
		if(isset($_POST["type"])){
			$decode= json_decode($_POST["type"]);
			$type=$decode->{'type'};
			switch ($type) {
				case "login":
					$nom= $decode->{'user'};
					$pas= $decode->{'pass'};
					try {
		  				$con = new PDO('mysql:host=localhost;dbname=FireAlarm', 'root','');
		  				$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  				$stmt = $con->prepare('SELECT * FROM user WHERE name= :nombre AND passswd= :clave');
		  				$rows = $stmt->execute(array(':nombre'   => $nom, ':clave' => $pas));
		  				if($rows>0){
		  					$var= array('estado'=>'exito');
		  					echo json_encode($var);
		  				}
		  				else{
		  					$var= array('estado'=>'fail');
		  					echo json_encode($var);
		  				}
					} 
					catch(PDOException $e) {
		  			echo 'Error conectando con la base de datos: ' . $e->getMessage();
		  			}
					break;
				case "notification":
					$user=$_SESSION["usuario"];
					$lastRecv=$decode->{'lastRecv'};
					try {
		  				$con = new PDO('mysql:host=localhost;dbname=FireAlarm', 'root','');
		  				$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  				$stmt = $con->prepare('SELECT code FROM incident WHERE user= :nombre AND time < :last');
						/*
						esta sentencia debe ser modificada de 2 formas:
						-user en esa tabla es el codigo del usuario en la tabla user... no su nombre
						-revisar lo que se entrega y lo que se compara
						*/
		  				$rows = $stmt->execute(array(':nombre'   => $user, ':last' => $lastRecv));
		  				if($rows>0){
		  					$fila= $stmt->fetch(); 
		  					$var= array('notifica'=> $fila[0]);
		  					echo json_encode($var);
		  				}
		  				else{
		  					$var= array('notifica'=>'null');
		  					echo json_encode($var);
		  				}
					} 
					catch(PDOException $e) {
		  				echo 'Error conectando con la base de datos: ' . $e->getMessage();
		  			}
					break;
				case "getNeighbour":
					$user=$_SESSION["usuario"];
					$lastRecv=$decode->{'lastRecv'};    //////////////
					try {
		  				$con = new PDO('mysql:host=localhost;dbname=FireAlarm', 'root','');
		  				$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  				$stmt = $con->prepare('SELECT code FROM incident WHERE user= :nombre AND time < :last');  ////////////
		  				$rows = $stmt->execute(array(':nombre' => $user, ':last' => $lastRecv));    //////////
		  				if($rows>0){
		  					$fila= $stmt->fetch(); 
		  					$var= array('notifica'=> $fila[0]);
		  					echo json_encode($var);
		  				}
		  				else{
		  					$var= array('notifica'=>'null');
		  					echo json_encode($var);
		  				}
					} 
					catch(PDOException $e) {
		  			echo 'Error conectando con la base de datos: ' . $e->getMessage();
		  			}
					break;
				case "saveIncident":
					$user=$_SESSION["usuario"];
					$sens=$decode->{'sensors'};
					try {
		  				$con = new PDO('mysql:host=localhost;dbname=FireAlarm', 'root','');
		  				$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
						//user debe ser codigo de usuario en tabla user, no el nombre 
						//tambien se debe obtener fecha y hora por separado 
						//como rayos hacer que no detecte date y time como palabras especiales .-.
		  				$stmt = $con->prepare('INSERT INTO incident (/*code, */date, time, user, sensorData) VALUES (:fecha, :hora, :nombre, :sens)');
		  				$rows = $stmt->execute(array(':fecha' => date(), 'hora' => time(), ':nombre' => $user, ':sens' => $sens));
		  				if($rows>0){
							echo json_encode(array('estado'=>'exito'));
		  				}
		  				else{
		  					$var= array('estado'=>'fail');
		  					echo json_encode($var);
		  				}
					} 
					catch(PDOException $e) {
		  			echo 'Error conectando con la base de datos: ' . $e->getMessage();
		  			}
					break;
				case "updateUser":
					$user=$_SESSION["usuario"];
					$cod=$decode->{'code'};
					$nom=$decode->{'user'};
					$lastN=$decode->{'lastN'};
					$eml=$decode->{'email'};
					/* algunos de estos datos no deberian actualizarse nunca
					$address;
					$organization;
					$subGroup;
					$gpsCoords;
					$deviceID;
					*/
					$pas=$decode->{'pass'};
					try {
		  				$con = new PDO('mysql:host=localhost;dbname=FireAlarm', 'root','');
		  				$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  				$stmt = $con->prepare('UPDATE user (code, name, lastName, email, address, organization, subGroup, gpsCoords, deviceID, passwd) VALUES (:code, :name, :lastName, :email, :addr, :org, :subG, :gpsC, :devID, :passwd)');
		  				$rows = $stmt->execute(array(':code' => $cod, ':name' => $nom, ':lastName' => $lastN, ':email' => $eml, ':addr', ':org', ':subG', ':gpsC', ':devID', ':passwd' => $pas));
		  				if($rows>0){
							echo json_encode(array('estado'=>'exito'));
		  				}
		  				else{
		  					$var= array('estado'=>'fail');
		  					echo json_encode($var);
		  				}
					} 
					catch(PDOException $e) {
		  			echo 'Error conectando con la base de datos: ' . $e->getMessage();
		  			}
					break;
				case "register":
					//si no hay resitro de este usuario previamente.... sesion o no sesion ?
					$user=$_SESSION["usuario"];
					$cod=$decode->{'code'};
					$nom=$decode->{'user'};
					$lastN=$decode->{'lastN'};
					$eml=$decode->{'email'};
					/* hay que revisar como obtener algunos de estos datos o como determinarlos
					$address;
					$organization;
					$subGroup;
					$gpsCoords;
					$deviceID;
					*/
					$pas=sha1($decode->{'pass'});
					try {
		  				$con = new PDO('mysql:host=localhost;dbname=FireAlarm', 'root','');
		  				$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  				$stmt = $con->prepare('INSERT INTO user (code, name, lastName, email, address, organization, subGroup, gpsCoords, deviceID, passwd) VALUES (:code, :name, :lastName, :email, :addr, :org, :subG, :gpsC, :devID, :passwd)');
		  				$rows = $stmt->execute(array(':code' => $cod, ':name' => $nom, ':lastName' => $lastN, ':email' => $eml, ':addr', ':org', ':subG', ':gpsC', ':devID', ':passwd' => $pas));
		  				if($rows>0){
							echo json_encode(array('estado'=>'exito'));
		  				}
		  				else{
		  					$var= array('estado'=>'fail');
		  					echo json_encode($var);
		  				}
					} 
					catch(PDOException $e) {
		  			echo 'Error conectando con la base de datos: ' . $e->getMessage();
		  			}
					break;
			}
		}
	}	
?>