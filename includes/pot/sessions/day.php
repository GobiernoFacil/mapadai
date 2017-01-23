<div id="sessions_day" class="viz hide" data-viz="heatmap">
	<div class="row">
		<div class="col-sm-10 col-sm-offset-1">
			<h3>Sesiones promedio por hora y semana: <span class="year-range">2015</span></h3>
			<!--<a href="#" class="download" download><b></b>Descargar datos</a>-->
			<p class="lead">Usuarios y sesiones que tiene el POT por día de la semana y hora.</p>					
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
				<li class="zero"><b></b> <span>0</span></li>
				<li class="fifty"><b></b> <span>50</span></li>
				<li class="max"><b></b> <span>100</span></li>
			</ul>
		</div>
		
	</div>
	<section id="heatmap-a"></section>
	<!--source-->
	<div class="row">
		<div class="col-sm-10 col-sm-offset-1">
			<!--source-->
			<?php include "templates/source.php";?>
			<p class="small">Definición de sesión: Una sesión se define por el tiempo en el que un usuario permanece en sitio.</p>
		</div>
	</div>
</div>
