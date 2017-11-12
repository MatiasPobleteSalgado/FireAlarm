<?php
	require_once("db.php");
	require_once("user.php");

	class Login{
		private static $query = "SELECT * FROM User WHERE email = :email";
			
		public static function getLogin($db, $email, $passwd){
			$sel = $db -> conn -> prepare(Login::$query);
			$sel -> execute(array(':email'   => $email));
			$result = $sel -> fetchAll();

			$user = NULL;
			if($result > 0){
				//if(sha1($passwd) == $result[0]["passwd"]){     //como haciamos el registro? 
				if(md5($passwd) == $result[0]["passwd"]){
					$user = new User($result[0]["code"], $result[0]["name"], $result[0]["lastName"], $result[0]["email"]);
				}
			}
			return $user;
		}

	}
?>