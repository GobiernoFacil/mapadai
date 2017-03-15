<?php 
	$body_class 	= "mapadaimx_data";
	$title 			= "Entidades Federativas | INAI MapaDaiMx";
	$description 	= "Para el desarrollo del Diagnóstico #MapaDAImx, el INAI solicitó a los organismos garantes de las entidades federativas su colaboración";
	include "templates/header.php";?>
<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h1>Entidades Federativas</h1>
			</div>
		</div>
	</div>
</div>
<div class="infomex_menu">
	<!-- year selector-->
	<div class="selector_year">
		<div class="container">
			<div class="row">
				<div class="col-xs-8">
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
<p class="source right">Estos datos fueron capturados manualmente de documentos obtenidos en la <a href="http://www.plataformadetransparencia.org.mx/documents/10181/39995/Ejercicio+DAIP+en+M%C3%A9xico+2008-2014_PEF2016.pdf/5dc80442-4802-4310-8f59-3565a26eb4a9">Plataforma Nacional de Transparencia</a> por el equipo de <a href="http://gobiernofacil.com/">Gobierno Fácil</a>.</p>
 <div class="content_graph">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				
				<div class="viz">
					
					<div class="row">
						<div class="col-sm-8 col-sm-offset-2">
				<h2>Estadísticas</h2>
							<p>Para el desarrollo del Diagnóstico <strong>#MapaDAImx</strong>, el INAI solicitó a los organismos garantes de las  entidades federativas su colaboración para atender por una parte, un cuestionario sobre solicitudes de información y recursos de revisión recibidos en su ámbito de competencia y, en su caso, sobre información del uso del Portal de Obligaciones de Transparencia en el cual se publican las obligaciones de transparencia por las leyes de las distintas entidades federativas; y, por la otra, las consultas a bases de datos en los casos que los órganos garantes contaran con Infomex, para extraer información sobre solicitudes de acceso y recursos de revisión recibidos en su ámbito de competencia.</p>

							<p>Los cuestionarios sobre solicitudes de acceso y recursos de revisión fueron distintos, en atención 
								a la existencia del Sistema Infomex en las entidades federativas.</p>
							<p>Derivado de esta solicitud fue entregada la siguiente información por parte de las entidades federativas 
								y los otros sujetos obligados:</p>
							<div class="row table_header">
								<div class="col-sm-6">
									<p>Sujeto Obligado</p>
								</div>
								<div class="col-sm-2">
									<p>Cuestionario</p>
								</div>
								<div class="col-sm-2">
									<p>Base de datos solicitudes</p>
								</div>
								<div class="col-sm-2">
									<p>Base de datos recursos</p>
								</div>
							</div>
							<ol class="table_entidades">
								<!-- aguascalientes-->
								<li class="row">
									<span class="col-sm-4">
										<p>Aguascalientes</p>
									</span>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!-- Baja Califormia-->
								<li class="row">
									<div class="col-sm-6">
										<p>Baja California</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!-- Baja California Sur-->
								<li class="row">
									<div class="col-sm-6">
										<p>Baja California Sur</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
										<div class="status_ok"><a href="/files/Entidades_Federativas/BCS/3._BCS_Recursos.xlsx" download>Descargar</a></div>
									</div>
								</li>
								<!--Campeche-->
								<li class="row">
									<div class="col-sm-6">
										<p>Campeche</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Chiapas-->
								<li class="row">
									<div class="col-sm-6">
										<p>Chiapas</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Chihuahua-->
								<li class="row">
									<div class="col-sm-6">
										<p>Chihuahua</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
										<div class="status_ok">
											<a href="/files/Entidades_Federativas/Chihuahua/6._Chihuahua_Solicitudes.xlsx" download>Descargar</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="status_ok">
											<a href="/files/Entidades_Federativas/Chihuahua/6._Chihuahua_Recursos.xlsx" download>Descargar</a>
										</div>
									</div>
								</li>
								<!--Coahuila-->
								<li class="row">
									<div class="col-sm-6">
										<p>Coahuila</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Colima-->
								<li class="row">
									<div class="col-sm-6">
										<p>Colima</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Distrito Federal-->
								<li class="row">
									<div class="col-sm-6">
										<p>Distrito Federal</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Durango-->
								<li class="row">
									<div class="col-sm-6">
										<p>Durango</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Estado de México-->
								<li class="row">
									<div class="col-sm-6">
										<p>Estado de México</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Guanajuato-->
								<li class="row">
									<div class="col-sm-6">
										<p>Guanajuato</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Guerrero-->
								<li class="row">
									<div class="col-sm-6">
										<p>Guerrero</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Hidalgo-->
								<li class="row">
									<div class="col-sm-6">
										<p>Hidalgo</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Jalisco-->
								<li class="row">
									<div class="col-sm-6">
										<p>Jalisco</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Michoacán-->
								<li class="row">
									<div class="col-sm-6">
										<p>Michoacán</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
										<div class="status_ok">
											<a href="/files/Entidades_Federativas/Michoacan/15._Michoacan_Solicitudes.xlsx" download>Descargar</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="status_ok">
											<a href="/files/Entidades_Federativas/Michoacan/15._Michoacan_Recursos.xlsx" download>Descargar</a>
										</div>
									</div>
								</li>
								<!--Morelos-->
								<li class="row">
									<div class="col-sm-6">
										<p>Morelos</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Nayarit-->
								<li class="row">
									<div class="col-sm-6">
										<p>Nayarit</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Nuevo León-->
								<li class="row">
									<div class="col-sm-6">
										<p>Nuevo León</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Oaxaca-->
								<li class="row">
									<div class="col-sm-6">
										<p>Oaxaca</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Puebla-->
								<li class="row">
									<div class="col-sm-6">
										<p>Puebla</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
								</li>
								<!--Querétaro-->
								<li class="row">
									<div class="col-sm-6">
										<p>Querétaro</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Quintana Roo-->
								<li class="row">
									<div class="col-sm-6">
										<p>Quintana Roo</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--San Luis Potosí-->
								<li class="row">
									<div class="col-sm-6">
										<p>San Luis Potosí</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Sinaloa-->
								<li class="row">
									<div class="col-sm-6">
										<p>Sinaloa</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Sonora-->
								<li class="row">
									<div class="col-sm-6">
										<p>Sonora</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Tabasco-->
								<li class="row">
									<div class="col-sm-6">
										<p>Tabasco</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Tamaulipas-->
								<li class="row">
									<div class="col-sm-6">
										<p>Tamaulipas</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Tlaxcala-->
								<li class="row">
									<div class="col-sm-6">
										<p>Tlaxcala</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Veracruz-->
								<li class="row">
									<div class="col-sm-6">
										<p>Veracruz</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
								</li>
								<!--Yucatán-->
								<li class="row">
									<div class="col-sm-6">
										<p>Yucatán</p>
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
								<!--Zacatecas-->
								<li class="row">
									<div class="col-sm-6">
										<p>Zacatecas</p>
									</div>
									<div class="col-sm-2">
										<!--<div class="status_ok"></div>-->
									</div>
									<div class="col-sm-2">
									</div>
									<div class="col-sm-2">
									</div>
								</li>
							</ol>
							
							<p>Los motivos por los cuales no fue entregada la información solicitada por algunas entidades federativas así como por los otros sujetos obligados, fueron por problemas diversos, muchos relacionados con capacidades tecnológicas.</p>

							<div class="divider"></div>
							<h3>Cuestionarios</h3>
							<p>
							<a href="/files/DGPA_MapaDAI_edos_conINFOMEX.pdf" class="btn file">Cuestionario para Órganos Garantes de las entidades federativas con INFOMEX</a></p>
							<p>
							<a href="/files/DGPA_MapaDAI_edos_sinINFOMEX.pdf" class="btn file">Cuestionario para Órganos Garantes de las entidades federativas sin INFOMEX</a></p>
							
							<div class="divider"></div>

						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
 </div>
	
	<div class="clearfix"></div>
	
	<!--CTA-->
	<a href="/que-es.php" class="btn proceso">¿Qué es el <strong>#MapaDAImx</strong>?</a>
	
<?php include "templates/footer.php";?>