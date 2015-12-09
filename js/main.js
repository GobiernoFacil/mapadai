// INAI - Diagnósitco MapaDAImx
// date     : 23/10/2015
// @package : promexico
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
  case "users":
    current_controller = "controller";
    break;
  case "companies":
    current_controller = "companies_controller"; 
    break;
  default:
    current_controller = "controller";
    break;
}

/*
require([current_controller], function(controller){ 
  app = new controller();
});
*/

console.log(":D");