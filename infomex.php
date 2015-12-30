<?php 
	$body_class 	= "infomex";
	$title 			= "Infomex";
	$description 	= "";
	include "templates/header.php";?>
<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-4">
				<h2>2008</h2>
			</div>
			<div class="col-sm-4">
				<h3>INFOMEX</h3>
			</div>
		</div>
	</div>
</div>

<div class="container">
	<div class="row">
		<div class="col-sm-2 nav">
			<h2>340 <span>respuestas</span></h2>
			<ul>
				<li><a href="#" id="show_time" class="current">Gráfica 1</a></li>
				<li><a href="#" id="show_top">Gráfica 2</a></li>
				<li><a href="#" id="show_treemap">Gráfica 3</a></li>
				<li><a href="#" id="show_heatmap">Gráfica 4</a></li>
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
				<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
				<section id="heatmap-a">
				  <form method="GET" id="infomex-heatmap-a" class="row">
				   <div class="col-sm-6">
				    <p>
				      <label>from:</label>
				      <input type="date" name="from">
				    </p>
				   </div>
				   <div class="col-sm-6">
				    <p>
				      <label>to:</label>
				      <input type="date" name="to">
				    </p>
				   </div>
				  </form>
				</section>
			</div>
		</div>
	</div>
</div>





<?php include "templates/footer.php";?>