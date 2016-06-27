// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : top10chart_view.js
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
      Scale    = require("common_views/linear_scale_view"),
      Color_r  = ["#225378","#3498DB", "#1695A3" , "#EB7F00", "#FF6138",  "#CE003C", "#79BD8F", "#00A388","#7E8AA2", "#2C3E50"],

  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  First_time = true,
  Format     = d3.format(","),
  Current_range = null,
  Margins    = {
    width    : 600,
    height   : 600,
    top      : 20,
    right    : 30,
    bottom   : 100, 
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
  var top10 = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
   
    },

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(settings){
      this.divs       = null;
      this.first_time = true;
      this.controller = settings.controller;
      this.dataURL    = settings.dataURL;
    },

    render : function(data, range){
      Current_range = range;
      var x_scale   = this.scale(data);

      if(this.first_time){
        this.divs = d3.select(this.el).selectAll("div")
                      .data(data)
                      .enter()
                      .append("div")
                      .attr("class", "content-top");

        this.divs.append("p")
          .html(function(d){
            return d.dependencia + ": <strong>" + Format(d.total) +"</strong>";
          });
        this.divs.append("div")
        .attr("class", "bar")
        .style({
          background : function (d, i) {
	          	return  Color_r[i];    		    
            },
          height : "30px",
          width : function(d){
            return x_scale(d.total) + "px";
          }
        });
        this.first_time = false;
      }
      else{
        this.divs.data(data);
        this.divs.select(".bar").transition().duration(500).ease("sin-in-out").style({
          width : function(d){
            return x_scale(d.total) + "px";
          }
        });
        this.divs.select("p")
          .html(function(d){
            return d.dependencia + ": <strong>" + Format(d.total)+"</strong>";
          });
      }
      
    },

    scale : function(data){
      var x      = [Margins.left, Margins.width - Margins.left - Margins.right],
          extent = d3.extent(data, function(d){
            return +d.total;
          }),
          scale = d3.scale.linear()
                    .domain(extent)
                    .range(x);
      return scale;
    },

    get_range : function(){
      return Current_range;
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return top10;
});