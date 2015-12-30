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
				<li><a href="#" class="current">Gráfica 1</a></li>
				<li><a href="#">Gráfica 2</a></li>
				<li><a href="#">Gráfica 3</a></li>
				<li><a href="#">Gráfica 4</a></li>
			</ul>
		</div>
		<!--timeline-->
		<div class="col-sm-10">
			<div class="viz">
				<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
				<section id="timeline-a"></section>
			</div>

			<div class="viz">
				<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
				<section id="top10bar"></section>
			</div>
			
			<div class="viz">
				<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
				<section id="treemap-a"></section>
			</div>
			
			<div class="viz">
				<h3>Top 10 de sujetos obligados por número de solicitudes</h3>
				<section id="heatmap-a">
				  <form method="GET" id="infomex-heatmap-a">
				    <p>
				      <label>from:</label>
				      <input type="date" name="from">
				    </p>
				    <p>
				      <label>to:</label>
				      <input type="date" name="to">
				    </p>
				  </form>
				</section>
			</div>
		</div>
	</div>
</div>





<?php include "templates/footer.php";?>