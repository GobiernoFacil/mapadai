<?php 
	$body_class 	= "infomex";
	$title 			= "Infomex";
	$description 	= "";
	include "templates/header.php";?>


<section id="timeline-a"></section>

<section id="top10bar"></section>

<section id="treemap-a"></section>

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
<?php include "templates/footer.php";?>