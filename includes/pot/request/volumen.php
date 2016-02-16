<div id="pot_volumen" class="viz" data-viz="treemap">
	<div class="row">
		<div class="col-sm-12">
			<h3>Volumen de solicitudes por sector, por sujeto obligado y por tipo de solicitud <span>(acceso a la información, 
				acceso a datos personales y corrección de datos personales)</span>: <span class="year-range">2012 - 2015</span></h3>
				<p class="lead">Solicitudes que se realizan por sujeto obligado, tanto de acceso a la información como de datos personales</p>
			<!--<a href="#" class="download" download><b></b>Descargar datos</a>-->	
		</div>
		<div class="col-sm-10 col-sm-offset-1">
			<p class="instructions">Da clic sobre un sector para observar la distribución del número de solicitudes por sujeto obligado 
				y tipo de solicitud. Para regresar, da clic sobre el área gris en la parte superior de la gráfica.
			</p>						
		</div>
	</div>
	<section id="treemap-a"></section>
	<!--source-->
	<div class="row">
		<div class="col-sm-10 col-sm-offset-1">
			<!--source-->
			<?php include "templates/source.php";?>
			<p class="lead info">Distribución de la gráfica</p>
			<ul class="info row">
				<li class="col-sm-3">Primer nivel: <strong>Sector</strong></li>
				<li class="col-sm-3">Segundo nivel: <strong>Sujeto obligado</strong></li>
				<li class="col-sm-3">Tercer nivel: <strong>Tipo de solicitud</strong>
					<ol>
						<li>Acceso a la información pública</li> 
						<li>Datos personales</li> 
						<li>Corrección de datos personales</li>
					</ol>
				</li>
				<li class="col-sm-3">Tamaño: <strong>Número de solicitudes</strong></li>
			</ul>
		</div>
	</div>
</div>
