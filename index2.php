<?php 
	$body_class 	= "mapadaimx_data";
	$title 			= "MapaDaiMx";
	$description 	= "";
	include "templates/header.php";?>
   
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

  <!-- el mapa! -->
  <div id="map"></div>
  <ul id="year-selector"></ul>
	

	
	<div class="clearfix"></div>
	
	<!--CTA-->
	<a href="/que-es.php" class="btn proceso">¿Qué es el <strong>#MapaDAImx</strong>?</a>
	
<?php include "templates/footer.php";?>