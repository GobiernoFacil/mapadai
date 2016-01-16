// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js
// @file     : controller_infomex.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),
      d3       = require("d3"),
      noUiSlider = require("nouislider"),
      HeatMap  = require("common_views/heat_map_view"),
      Top10bar = require("common_views/top10chart_view"),
      Timeline = require("common_views/timelines_view"), 
      TreeMap  = require("common_views/treemap_view"); 
  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  
    // CONTAINERS
  	timeContainer  	 = document.querySelector("#time"),
  	topContainer   	 = document.querySelector("#top"),
  	treemapContainer = document.querySelector("#treemap"),
  	heatmapContainer = document.querySelector("#heatmap");
  	
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
		"click #show_time"    : "show_time",
		"click #show_top"     : "show_top",
		"click #show_treemap" : "show_treemap",
		"click #show_heatmap" : "show_heatmap"
    },

    //
    // [ DEFINE THE TEMPLATES ]
    //


    //
    // [ SET THE CONTAINER ]
    //
    //
    el : 'body',

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){

      console.log(noUiSlider);
      var slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  range: {
    'min': 0,
    'max': 100
  }
});

	  this.hide_stuff();
	  
      this.heatmap_a = new HeatMap({
        controller : this,
        el         : "#heatmap-a"
      });

      this.treemap_a = new TreeMap({
        controller : this,
        el : "#treemap-a"
      });

      this.top10bars = new Top10bar({
        controller : this,
        el : "#top10bar"
      });

      this.timeline_a = new Timeline({
        controller : this,
        el : "#timeline-a"
      });
    },
    
    hide_stuff : function(){
		topContainer.style.display= "none";
		treemapContainer.style.display = "none";
		heatmapContainer.style.display = "none";
    },
    
    //
    // L O C A L   T R A N S I T I O N S
    // --------------------------------------------------------------------------------
    //
    
    show_time : function(e){
	   e.preventDefault();
	   timeContainer.style.display 		= "block";
	   topContainer.style.display       = "none";
	   treemapContainer.style.display 	= "none";
	   heatmapContainer.style.display 	= "none";
	   $(".nav a").removeClass("current");
	   $("#show_time").addClass("current");
    },
    
    show_top : function(e){
	   e.preventDefault();
	   topContainer.style.display       = "block";
	   timeContainer.style.display 		= "none";
	   treemapContainer.style.display 	= "none";
	   heatmapContainer.style.display 	= "none";
	   $(".nav a").removeClass("current");
	   $("#show_top").addClass("current");
    },
    
    show_treemap : function(e){
	   e.preventDefault();
	   topContainer.style.display       = "none";
	   timeContainer.style.display 		= "none";
	   treemapContainer.style.display 	= "block";
	   heatmapContainer.style.display 	= "none";
	   $(".nav a").removeClass("current");
	   $("#show_treemap").addClass("current");
    },
    
    show_heatmap : function(e){
	   e.preventDefault();
	   topContainer.style.display       = "none";
	   timeContainer.style.display 		= "none";
	   treemapContainer.style.display 	= "none";
	   heatmapContainer.style.display 	= "block";
	   $(".nav a").removeClass("current");
	   $("#show_heatmap").addClass("current");
    },

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});