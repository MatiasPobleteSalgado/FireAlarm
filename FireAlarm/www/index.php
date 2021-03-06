<?php
	$access = "PUBLIC";
?>

<!DOCTYPE html>
<html>
<head>
	<title>FireAlarm</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/palette.css">
</head>
<body class="">
	<div role="navigation" class="navbar navbar-default navbar-static-top b-color-0 color-3 no-border">
		<div class="container no-border">
			<div class="navbar-header no-border">
				<p class="navbar-brand hCenter color-3" id="logo">SmartFireAlarm</p>
				<div type="button" class="navbar-toggle no-border" data-toggle="collapse" data-target="#navBar">
				<span class="glyphicon glyphicon-align-justify"></span>
				</div>
			</div>
			<ul class="nav navbar-nav collapse navbar-collapse no-border" id="navBar">
				<!--
				<li><a href="index.php">Home</a></li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown">Art
					<span class="caret"></span></a>
					<ul class="dropdown-menu">
					  <li><a href="#">Digital</a></li>
					  <li><a href="#">Traditional</a></li>
					  <li><a href="#">Sketchbook</a></li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown">Design
					<span class="caret"></span></a>
					<ul class="dropdown-menu">
					  <li><a href="#">Logo</a></li>
					  <li><a href="#">Posters</a></li>
					  <li><a href="#">Products</a></li>
					</ul>
				</li>
				<li><a href="#">About</a></li>
				<li><a href="#">Contact</a></li>
				-->
				<li><a class="navigation onceLoged" href="#" style="display: none;" name="account">Cuenta</a></li>
				<li><a class="navigation onceLoged" href="#" style="display: none;" name="monitor">Monitoreo</a></li>
				<li><a class="navigation onceLoged" href="#" style="display: none;" name="notifications">Notificaciones</a></li>
				<li><a class="navigation"           href="#"                        name="settings">Configuracion</a></li>

			</ul>
		</div>
	</div>

	<div class="container b-color-3 color-0 fillHeight" id="loginCont">
		<h2>Ingreso</h2>
		<form class="form" id="loginForm">
			<input type="hidden" name="type" value="login">
			<div class="form-group">
				<label for="email">Email:</label>
				<input type="email" name="email" class="form-control" id="email" required="required">
			</div>
			<div class="form-group">
				<label for="passwd">Password:</label>
				<input type="password" name="passwd" class="form-control" id="passwd" required="required">
			</div>
			<button type="submit" class="btn btn-default">Log in</button>
		</form>
	</div>

	<div class="container b-color-3 color-0 fillHeight" id="wifiCont" style="display: none;">
		<div class="list-group" id="wifiList">
			<h1>Redes disponibles</h1>
		</div>
		<form class="form" id="wifiForm" style="display: none;">
			<h3 id="selectedNet"></h3>
			<input type="hidden" name="type" value="wifiSelection">
			<div class="form-group">
				<label for="wifiPasswd">Password</label>
				<input type="password" name="wifiPasswd" class="form-control" id="wifiPasswd" required="required">
				<button type="submit" class="btn btn-default">Connect</button>
			</div>
		</form>
	</div>

	<div class="container b-color-3 color-0 fillHeight" id="settingCont" style="display: none;">
		<h1>Settings</h1>
	</div>

	<div class="container b-color-3 color-0 fillHeight" id="monitorCont" style="display: none;">
		<h1>Monitor de sensores</h1>
		<ul class="list-group" id="sensorList">
			
		</ul>
	</div>

	<div class="container b-color-3 color-0 fillHeight" id="accountCont" style="display: none;">
		<h1>Cuenta</h1>

	</div>

	<div class="container b-color-3 color-0 fillHeight" id="notificationCont" style="display: none;">
		<h1>Notifications</h1>
	</div>

	<div class="copyright">
		<p class="hCenter">&copy; 2017 Matias Poblete</p>
	</div>
	<!-- JQuery -->
	<script src="js/jquery.js"></script>
	<!-- Bootstrap JavaScript -->
	<script src="js/bootstrap.min.js"></script>
	<!-- Custom scripts-->
	<script src="js/login.js"></script>
	<script src="js/account.js"></script>
	<script src="js/settings.js"></script>
	<script src="js/notifications.js"></script>
	<script src="js/monitor.js"></script>
	<script src="js/wifiSelector.js"></script>
	<script src="js/main.js"></script>
</body>
</html>