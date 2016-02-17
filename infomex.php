<?php 
	$body_class 	= "infomex";
	$title 			= "Solicitudes de Información Infomex | #MapaDAImx | INAI";
	$description 	= "Estadísticas de Solicitudes de Información del INAI, 2003 - 2016. INAI";
	$section_name	= "Solicitudes de Información";
	include "templates/header.php";?>

<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h1>Solicitudes de información</h1>
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
						<li><a href="#" class="current" data-container="obligee">Por sujeto obligado</a></li>
						<li><a href="#" data-container="respuesta">Por tipo de respuesta</a></li>
						<li><a href="#" data-container="applicant_profile">Perfil del solicitante</a></li>
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
	
	<!-- sujeto obligado-->
	<div id="obligee" class="content-tab">
		<nav class="nav subnav re">
			<ul class="sub_nav">
				<li><a href="#" class="current" data-container="obligee_sujeto">Por sujeto</a></li>
				<li><a href="#"  data-container="obligee_historico">Histórico</a></li>
				<li><a href="#" data-container="obligee_total">Total</a></li>
			</ul>
		</nav>
		
		<div class="container">
			<div class="row">			
				<div class="col-sm-12">
					<!--timeline-->
					<?php include "includes/infomex/time.php";?>
					
					<!--top10bar-->
					<?php include "includes/infomex/bar.php";?>

					<!--treemap-->
					<?php include "includes/infomex/treemap.php";?>
				</div>
			</div>
		</div>
	</div>
			
	<!--tipo de respuesta -->
	<div id="t_response"  class="content-tab hide">>
	</div>

	<!--perfil del solicitante-->
	<div id="applicant_profile" class="content-tab hide">
		<nav class="nav subnav re">
			<ul class="sub_nav">
				<li><a href="#" class="current" data-container="profile_genre">Por sexo y grupo de edad</a></li>
				<li><a href="#"  data-container="profile_occupation">Por ocupación</a></li>
			</ul>
		</nav>
		<div class="container">
			<div class="row">			
				<div class="col-sm-12">
					<!--profile_genre-->
					<?php include "includes/infomex/profile/genre.php";?>
					<!--occupation-->
					<?php include "includes/infomex/profile/occupation.php";?>
				</div>
			</div>
		</div>
	</div>				
			
</div>


<?php include "templates/footer.php";?>