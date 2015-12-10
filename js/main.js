// INAI - Diagnósitco MapaDAImx
// date     : 23/10/2015
// @package : INAI
// @file    : main.js
// @version : 1.0.0
// @author  : Gobierno fácil <howdy@gobiernofacil.com>
// @url     : http://gobiernofacil.com

require.config({
  baseUrl : "/js",
  paths : {
    jquery     : "bower_components/jquery/dist/jquery.min",
    backbone   : "bower_components/backbone/backbone",
    underscore : "bower_components/underscore/underscore-min",
    text       : "bower_components/requirejs-text/text",
    d3         : "bower_components/d3/d3"
  },
  shim : {
    backbone : {
      deps    : ["jquery", "underscore"],
      exports : "Backbone"
    }
  }
});

var app, current_controller;

switch(CONFIG.section){
  case "home":
    current_controller = "controller_main";
    break;
  case "infomex":
    current_controller = "controller_infomex"; 
    break;
  case "pot":
    current_controller = "controller_pot"; 
    break;
  case "recursos":
    current_controller = "controller_recursos"; 
    break;
  default:
    current_controller = "controller_main";
    break;
}


require([current_controller], function(controller){ 
  app = new controller();
});
