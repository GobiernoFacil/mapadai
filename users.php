<?php 
	$body_class 	= "usuarios";
	$title 			= "Usuarios";
	$description 	= "";
	include "templates/header.php";?>
<div class="sub">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h1>Usuarios</h1>
			</div>
			
		</div>
	</div>
</div>
  <div id="users-by-gender"></div>
  <div id="users-by-occupation"></div>
  <div id="users-by-age"></div>
  <div id="users-by-age-and-gender"></div>

  <script>
  CONFIG = { section : "usuarios" };
  
</script>
<?php include "templates/footer.php";?>