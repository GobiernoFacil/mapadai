// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : timelines_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),
      d3       = require("d3"),
      SVG      = require("common_views/main_svg_view"),
      //Scale    = require("common_views/linear_scale_view"),
      //Axis     = require("common_views/heat_map_axis_view"), 
      //Color_r  = ["white", "green"],
      URL      = "/js/data/timeline.json",
  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  Margins = {
    width    : 600,
    height   : 600,
    top      : 20,
    right    : 30,
    bottom   : 40, 
    left     : 30,
    padding  : 0,
    oPadding : 15
  };

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var timeline = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
   
    },

    //
    // [ DEFINE THE TEMPLATES ]
    //

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      var that = this;
      this.svg = new SVG(this.el, Margins);

      d3.json(URL, function(data){
        var d = data.data;
        that.prepare_data(d);
        that.set_scales(d);
      });
      //this.x_scale = new Scale(Dummy, Margins, "total", "x");
      //this.render();
      //this.scales = new Scales(Margins);
      //this.axis   = new Axis(this.svg, this.scales, Margins);

      //this.render();
    },

    set_scales : function(data){

      var max = d3.max(data, function(d, i){
        return +d.total;
      }),
      ext = d3.extent(data, function(d){
        return d.date;
      }),
      y = d3.scale.linear()
            .domain([0, max])
            .range([Margins.height - Margins.bottom, Margins.top ]),
      x = d3.time.scale()
            .domain(ext)
            .range([Margins.left, Margins.width - Margins.left - Margins.right]);
            //.ticks(d3.time.year, 1);

      this.scales = [x, y];
    },

    prepare_data : function(data){
      data.map(function(d, i){
        d.total = +d.total;
        d.date  = new Date(d.year, d.month, 1);
      }, this);
    } 

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return timeline;
});