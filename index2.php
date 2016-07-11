<?php 
	$body_class 	= "mapadaimx_data";
	$title 			= "MapaDaiMx";
	$description 	= "";
	include "templates/header.php";?>

<div class="infomex_menu">
	<!-- year selector-->
	<div class="selector_year">
		<div class="container">
			<div class="row">
				<div class="col-xs-4">
					<!-- los controles temporales -->
					<form>
					  <select>
					    <!--
					    <option value="indice">indice</option>
					    <option value="presupuesto">presupuesto</option>
					    <option value="pob_conapo">población conapo</option>
					    -->
					  </select>
					</form>
				</div>
				<div class="col-xs-8">
					  <ul id="year-selector" class="year_list"></ul>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="map_container">
  <!-- el mapa! -->
  <div id="map"></div>
</div>

	
	<div class="clearfix"></div>
	
	<!--CTA-->
	<a href="/que-es.php" class="btn proceso">¿Qué es el <strong>#MapaDAImx</strong>?</a>
	
<?php include "templates/footer.php";?>