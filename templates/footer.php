	<!-- sorry-->
	<div class="sorry">
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<p>Esta herramienta es un prototipo funcional</p>
				</div>
			</div>
		</div>
	</div>
	<!-- footer-->
	<footer>
		<div class="container">
			<div class="col-sm-4">
				<h4>Enlaces</h4>
				<ul>
					<li><a href="http://inicio.ifai.org.mx/SitePages/Archivo_Gestion20.aspx">Gestión de Archivos									 </a></li>
					<li><a href="http://inicio.ifai.org.mx/SitePages/TransparenciaProactiva-IFAI.aspx">Transparencia Proactiva INAI						 	 </a></li>
					<li><a href="http://inicio.ifai.org.mx/DirectoriodeUnidadesdeenlace/Directorio_UE.xls" download>Directorio de Unidades Enlace</a></li>
					<li><a href="http://consultas.ifai.org.mx/Vacantessp">Convocatoria Procesos de Selección Puestos Vacantes</a></li>
					<li><a href="http://altacurricula.ifai.org.mx/SitePages/Inicio.aspx">Ingresa tu curriculum								 </a></li>
					<li><a href="http://sede.ifai.mx/SitePages/inicio.aspx">Sede INAI											 </a></li>
					<li>Oficialía de partes Lunes a Viernes de 8:00 a 18 hrs. </li>
					<li>Conmutador: 5004 2400								 </li>
					<li><a href="https://declaranet.ifai.org.mx/declaranet/rectificacion.jsp">Notas acalaratorias DEclaranet Plus					 </a></li>
				</ul>
			</div>
			<div class="col-sm-4 center">
				<ul class="sm">
					<li><a href="https://www.facebook.com/INAImx/" class="fb" target="_blank">Facebook Inai</a></li>
					<li><a href="https://twitter.com/INAImexico" class="tw" target="_blank">Twitter Inai</a></li>
					<li><a href="https://www.youtube.com/user/ifaimexico" class="yt" target="_blank">YouTube Inai</a></li>
				</ul>
				<p>Este proyecto es previo al lanzamiento de la <a href="http://www.plataformadetransparencia.org.mx">Plataforma Nacional de Transparencia</a>. Los datos que se reflejan se obtuvieron de las bases de datos abiertas que se publican en <strong>INFOMEX</strong>, y de las bases de datos proporcionadas por el Instituto, no reflejan la <a href="http:://inicio.ifai.org.mx/SitesPages/AIP-Estadisticas.aspx">estadística oficial</a>.</p>
				<!--<a href="" class="btn val">Evaluar sitio</a>-->
			</div>
			<div class="col-sm-4">
				<h4>Horarios</h4>
				<p>De lunes a jueves de 9:00 a 18:00 hrs. <br>
					Viernes de 09:00 a 15:00 hrs</p>
					
				<h4 class="inai">INAI. Instituto Nacional de Transparencia Acceso a la Información y Protección de Datos Personales </h4>
				<p>Insurgentes Sur No. 3211 Col. Insurgentes<br>
Cuculco, Delegación Coyoacán C.P. 04530</p>	
			</div>
		</div>
		
	</footer>
	 <label for="nav-collapse" class="overlay"></label>
    </main>
 </div>

<?php if($body_class == "mapadaimx_data" ):?>
<script src="js/bower_components/d3/d3.js"></script>
<script src="js/bower_components/leaflet/dist/leaflet.js"></script>
<script src="js/libs/classybrew/build/classybrew.min.js"></script>
<script src="js/bower_components/jquery/dist/jquery.min.js"></script>
<script src="js/main_mapa.js"></script>
<?php else:?>
<script>
  CONFIG = {
    section : "<?php echo !$body_class ? "" :  $body_class ;?>"
  };
</script>
<script data-main="/js/main" src="/js/bower_components/requirejs/require.js"></script>

<?php endif;?>
</body>
</html>