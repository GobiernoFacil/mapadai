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
    initialize : function(){
      this.divs = null;
    },

    render : function(data, range){
      Current_range = range;
      var x_scale   = this.scale(data);

      if(First_time){
        this.divs = d3.select(this.el).selectAll("div")
                      .data(data)
                      .enter()
                      .append("div")
                      .attr("class", "content-top");

        this.divs.append("p")
          .html(function(d){
            return d.dependencia + ": " + Format(d.total);
          });
        this.divs.append("div")
        .attr("class", "bar")
        .style({
          background : "#00c1a5",
          height : "30px",
          width : function(d){
            return x_scale(d.total) + "px";
          }
        });
        First_time = false;
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
            return d.dependencia + ": " + Format(d.total);
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