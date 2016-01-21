<?php 
	$body_class 	= "infomex";
	$title 			= "Infomex";
	$description 	= "";
	include "templates/header.php";?>
<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-9">
				<h1>Solicitudes de información</h1>
			</div>
			<div class="col-sm-3">
				<h2>2006 - 2015</h2>
			</div>
		</div>
	</div>
</div>
<!-- year selector-->
<div class="selector_year">
	<div class="container">
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
				<div id="slider"></div>
			</div>
		</div>
	</div>
</div>

<div class="content_graph">
	<div class="container">
		<div class="row">
			<div class="col-sm-2 nav">
				<h3>Selecciona visualización</h3>
				<ul>
					<li><a href="#" id="show_time" class="current">Gráfica 1</a></li>
					<li><a href="#" id="show_top">Gráfica 2</a></li>
					<li><a href="#" id="show_treemap">Gráfica 3</a></li>
					<li><a href="#" id="show_heatmap">Peticiones por hora</a></li>
				</ul>
			</div>
			
			<div class="col-sm-10">
				<!--timeline-->
				<div id="time" class="viz">
					<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
					<section id="timeline-a"></section>
				</div>
				
				<!--top10bar-->
				<div id="top" class="viz">
					<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
					<section id="top10bar"></section>
				</div>
				
				<!--treemap-->
				<div id="treemap" class="viz">
					<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
					<section id="treemap-a"></section>
				</div>
				
				<!--heatmap-->
				<div id="heatmap" class="viz">
					<h3>Peticiones por hora por día de la semana</h3>
					<div class="row">
						<div class="col-sm-10 col-sm-offset-1">
							<p>Integer lectus purus, efficitur efficitur massa ut, pharetra cursus dolor. In hac habitasse platea dictumst. Vivamus quis neque ut neque eleifend volutpat. Curabitur lorem mauris, sagittis maximus ultrices ac, aliquam non ex. Donec congue maximus justo, sit amet euismod leo venenatis ac. Vivamus venenatis, risus vitae rutrum laoreet, purus nibh rutrum ex, sed convallis enim urna a ligula. Donec lorem leo, vulputate vel porttitor et, ornare in sapien.</p>							
						</div>
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