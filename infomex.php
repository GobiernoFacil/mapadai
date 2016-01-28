<?php 
	$body_class 	= "infomex";
	$title 			= "Infomex";
	$section_name	= "Solicitudes de Información";
	$description 	= "";
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
					<ul>
						<li><a href="#" id="show_time" class="current">Dependencias</a></li>
						<li><a href="#" id="show_top">Top 5</a></li>
						<li><a href="#" id="show_treemap">Topor</a></li>
						<li><a href="#" id="show_heatmap">Peticiones por hora</a></li>
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
	<div class="container">
		<div class="row">
			
			
			<div class="col-sm-12">
				<!--timeline-->
				<div id="time" class="viz">
					<div class="row">
						<div class="col-sm-12">
							<h3>Peticiones por dependencia: <span>2007 - 2015</span></h3>
							<a href="#" class="download" download><b></b>Descargar datos</a>
						<!--	<p>Integer lectus purus, efficitur efficitur massa ut, pharetra cursus dolor. In hac habitasse platea dictumst. Vivamus quis neque ut neque eleifend volutpat. Curabitur lorem mauris, sagittis maximus ultrices ac, aliquam non ex. Donec congue maximus justo, sit amet euismod leo venenatis ac. Vivamus venenatis, risus vitae rutrum laoreet, purus nibh rutrum ex, sed convallis enim urna a ligula. Donec lorem leo, vulputate vel porttitor et, ornare in sapien.</p>	-->						
						</div>
					</div>
					<section id="timeline-a"></section>
					<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
							<p class="source">
								Fuente: INAI 2003
							</p>
						</div>
					</div>
				</div>
				
				<!--top10bar-->
				<div id="top" class="viz">
					<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
							<h3>Top 10 de sujetos obligados por número de solicitudes: <span>2012 - 2015</span></h3>
							<a href="#" class="download" download><b></b>Descargar datos</a>
							<p>Integer lectus purus, efficitur efficitur massa ut, pharetra cursus dolor. In hac habitasse platea dictumst. Vivamus quis neque ut neque eleifend volutpat. Curabitur lorem mauris, sagittis maximus ultrices ac, aliquam non ex. Donec congue maximus justo, sit amet euismod leo venenatis ac. Vivamus venenatis, risus vitae rutrum laoreet, purus nibh rutrum ex, sed convallis enim urna a ligula. Donec lorem leo, vulputate vel porttitor et, ornare in sapien.</p>							
						</div>
					</div>
					<section id="top10bar"></section>
				</div>
				
				<!--treemap-->
				<div id="treemap" class="viz">
					<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
							<h3>Top 10 de sujetos obligados por número de solicitudes: <span>2012 - 2015</span></h3>
							<a href="#" class="download" download><b></b>Descargar datos</a>
							<p>Integer lectus purus, efficitur efficitur massa ut, pharetra cursus dolor. In hac habitasse platea dictumst. Vivamus quis neque ut neque eleifend volutpat. Curabitur lorem mauris, sagittis maximus ultrices ac, aliquam non ex. Donec congue maximus justo, sit amet euismod leo venenatis ac. Vivamus venenatis, risus vitae rutrum laoreet, purus nibh rutrum ex, sed convallis enim urna a ligula. Donec lorem leo, vulputate vel porttitor et, ornare in sapien.</p>							
						</div>
					</div>
					<section id="treemap-a"></section>
				</div>
				
				<!--heatmap-->
				<div id="heatmap" class="viz">
					<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
							<h3>Peticiones por hora por día de la semana: <span>2012 - 2015</span></h3>
							<a href="#" class="download" download><b></b>Descargar datos</a>
							<p>Integer lectus purus, efficitur efficitur massa ut, pharetra cursus dolor. In hac habitasse platea dictumst. Vivamus quis neque ut neque eleifend volutpat. Curabitur lorem mauris, sagittis maximus ultrices ac, aliquam non ex. Donec congue maximus justo, sit amet euismod leo venenatis ac. Vivamus venenatis, risus vitae rutrum laoreet, purus nibh rutrum ex, sed convallis enim urna a ligula. Donec lorem leo, vulputate vel porttitor et, ornare in sapien.</p>							
						</div>
						
					</div>
					
					<div class="row">
						<div class="col-sm-1 col-sm-offset-2">
							<div class="legend">
								<p>Horas</p>
							</div>
						</div>
						<div class="col-sm-7">
							<ul class="legend right">
								<li class="zero"><b></b> 0</li>
								<li class="fifty"><b></b> 50</li>
								<li class="max"><b></b> 100</li>
							</ul>
						</div>
						
					</div>
					<section id="heatmap-a"></section>
					
				</div>
			</div>
		</div>
	</div>
</div>


<?php include "templates/footer.php";?>