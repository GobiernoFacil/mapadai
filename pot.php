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
						<li><a href="#" id="btn_obligee" class="current">Sesiones y usuarios</a></li>
						<li><a href="#" id="btn_t_response">Consultas al POT</a></li>
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
	<div id="obligee">
		<nav class="nav subnav re">
			<ul id="sub_nav">
				<li><a href="#" id="show_treemap"class="current">Por sujeto</a></li>
				<li><a href="#" id="show_time" >Histórico</a></li>
				<li><a href="#" id="show_top">Total</a></li>
			<!--	<li><a href="#" id="show_heatmap">Por hora</a></li>-->
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
	<div id="t_response">
	</div>

	<!--perfil del solicitante-->
	<div id="applicant_profile">
		<!--heatmap-->
		<?php include "includes/infomex/heatmap.php";?>
	</div>				
			
</div>


<?php include "templates/footer.php";?>