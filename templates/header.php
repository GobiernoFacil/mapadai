<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php echo !$body_class ? "" : 'class="' . $body_class .'"';?> lang="es-MX"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title><?php echo !$title ? "" :  $title ;?></title>
	<meta name="description" content="<?php echo !$description ? "" :  $description ;?>">
	<link rel="shortcut icon" href="/icon_mapadai.png">
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/dev.css">
	<link rel="stylesheet" type="text/css" href="/js/bower_components/nouislider/distribute/nouislider.min.css">
<!--
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
.oPYo.        8       o                              ooooo     .o         o 8 
8    8        8                                      8                      8 
8      .oPYo. 8oPYo. o8 .oPYo. oPYo. odYo. .oPYo.   o8oo   .oPYo. .oPYo. o8 8 
8   oo 8    8 8    8  8 8oooo8 8  `' 8' `8 8    8    8     .oooo8 8    '  8 8 
8    8 8    8 8    8  8 8.     8     8   8 8    8    8     8    8 8    .  8 8 
`YooP8 `YooP' `YooP'  8 `Yooo' 8     8   8 `YooP'    8     `YooP8 `YooP'  8 8 
:....8 :.....::.....::..:.....:..::::..::..:.....::::..:::::.....::.....::....
:::::8 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::..:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
-->
</head>
<body>
<div class="page">

	<input type="radio" id="nav-expand" name="nav" class="invis" />
    <nav class="nav-side">
      <label for="nav-collapse" class="close">
        &times;
      </label>
      <label for="nav-expand" class="btn-label">
        <span class="top"></span><span class="middle"></span><span class="bottom"></span>      
       </label>

      <ul class="menu-list">
        <li>
          <a href="/" title="Home">
            Inicio
          </a>
        </li>
        <!--INFOMEX-->
        <li>
          <a href="/infomex.php" title="INFOMEX">
            Solicitudes de información
          </a>
        </li>
        <!--pot-->
        <li>
          <a href="/pot.php" title="POT">
            Portal de obligaciones y transparencia
          </a>
        </li>
        <!--Recursos de revisión-->
        <li>
          <a href="/recursos.php" title="Recursos de revisión">
            Recursos de revisión
          </a>
        </li>
        <!--qué es-->
        <li>
          <a href="/que-es.php" title="#MapaDAImx">
            ¿Qué es #MapaDAImx?
          </a>
        </li>
        <!--entidades-->
        <li><a href="/entidades.php" title="Entidades">Entidades Federativas</a> </li>
         <!--entidades-->
        <li><a href="/otros-sujetos-obligados.php" title="Entidades">Otros sujetos obligados</a> </li>
      </ul>
    </nav>

    <input type="radio" id="nav-collapse" name="nav" checked="checked" class="invis" />
    
     <main class="main-base" role="main">
	<header class="main_header">
		<div class="col-xs-5 col-sm-5">
			<h1 class="inai">INAI.  Instituto Nacional de Transparencia Acceso a la Información y Protección de Datos Personales </h1>
		</div>
		<?php if ($body_class != "home"):?>
		<div class="col-sm-6">
			<h2 class="mapa"><a href="/">#Mapa<strong>DAI</strong>mx</a> <span class="section_name hide"><?php echo !$section_name ? "" :  " / " . $section_name ;?></span></h2> 
		</div>
		<?php endif;?>
		<div  class="clearfix"></div>
	</header>