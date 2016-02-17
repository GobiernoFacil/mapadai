<?php 
	$body_class 	= "pot";
	$title 			= "Portal de Obligaciones de Transparencia | #MapaDAImx | INAI";
	$description 	= "Estadísticas del Portal de Obligaciones de Transparencia. INAI, 2003 - 2016. INAI";
	$section_name	= "Portal de Obligaciones de Transparencia";
	include "templates/header.php";?>

<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
				<h1>Portal de Obligaciones de Transparencia (POT)</h1>
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
						<li><a href="#" class="current" data-container="sessions">Sesiones y usuarios</a></li>
						<li><a href="#" data-container="pot_c">Consultas al POT</a></li>
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
	<div id="pot_c" class="content-tab hide">
		<nav class="nav subnav re">
			<ul class="sub_nav">
				<li><a href="#" data-container="pot_volumen">Volumen de consultas</a></li>
				<li><a href="#" data-container="pot_historico">Histórico</a></li>
				<li><a href="#" data-container="pot_total">Total</a></li>
			</ul>
		</nav>
		<div class="container">s
			<div class="row">			
				<div class="col-sm-12">
					<!--pot_volumen-->
					<?php include "includes/pot/request/volumen.php";?>
					
					<!--pot_historico-->
					<?php include "includes/pot/request/historico.php";?>
					
					<!--pot_total-->
					<?php include "includes/pot/request/total.php";?>
				</div>
			</div>
		</div>
	</div>				
			
</div>


<?php include "templates/footer.php";?>