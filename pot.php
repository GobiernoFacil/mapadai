<?php 
	$body_class 	= "pot";
	$title 			= "POT | #MapaDAImx | INAI";
	$description 	= "POT INAI, 2003 - 2016. INAI";
	$section_name	= "POT";
	include "templates/header.php";?>

<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h1>POT</h1>
			</div>
			
		</div>
	</div>
</div>

<div class="infomex_menu">
	<!-- nav-->
	<div class="nav re">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<ul id="viz_nav">
						<li><a href="#" id="btn_sessions" class="current" data-container="sessions">Sesiones y usuarios</a></li>
						<li><a href="#" id="btn_request"  data-container="request">Consultas al POT</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>	
	<!-- year selector-->
	<div class="selector_year">
		<div class="container">
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1">
					<div id="slider"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- content-->
<div class="content_graph">
	
	<!-- Sesiones y usuarios-->
	<div id="sessions" class="content-tab">
		<nav class="nav subnav re">
			<ul class="sub_nav">
				<li><a href="#" class="current" data-container="sessions_number">Número de sesiones</a></li>
				<li><a href="#" data-container="sessions_day">Por día y hora</a></li>
				<li><a href="#" data-container="sessions_time">Tiempo por sesión</a></li>
			</ul>
		</nav>
		
		<div class="container">
			<div class="row">			
				<div class="col-sm-12">
					<!--sessions_number-->
					<?php include "includes/pot/sessions/number.php";?>
					
					<!--sessions_day-->
					<?php include "includes/pot/sessions/day.php";?>

					<!--sessions_time-->
					<?php include "includes/pot/sessions/time.php";?>
				</div>
			</div>
		</div>
	</div>
			

	<!--Consultas al POT-->
	<div id="request" class="content-tab hide">
		<nav class="nav subnav re">
			<ul class="sub_nav">
				<li><a href="#" id="show_something" class="current" data-container="sessions_number">Número de sesiones</a></li>
			</ul>
		</nav>
		<div class="container">
			<div class="row">			
				<div class="col-sm-12">
				
				</div>
			</div>
		</div>
	</div>				
			
</div>


<?php include "templates/footer.php";?>