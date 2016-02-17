// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : occupation_chart_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),
      d3       = require("d3"),

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
  },
  Rect = {
    height : 5,
    fill   : "black",
    slot   : 25, // el espacio entre rectángulo y rectángulo
    empty  : "sin especificar" 
  };

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var occupation = Backbone.View.extend({
    
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
      this.svg  = null;
    },

    render : function(data, range){
      // update SVG size
      Margins.height = (data.length * Rect.slot) + Margins.top + Margins.bottom; 
      Current_range = range;
      var data = _.sortBy(data, function(d){return d.ocupacion;});
      if(!this.svg){
        this.svg = this.make_svg(Margins);
      }

      var x_scale = this.scale(data);
      console.log(x_scale);
      this.bars = this.svg.selectAll("rect").data(data).enter()
        .append("rect")
          .attr("class", "occupation-rect")
          .attr("fill", Rect.fill)
          .attr("width", function(d){
            return x_scale(+d.suma);
          })
          .attr("height", Rect.height)
          .attr("x", Margins.left)
          .attr("y", function(d, i){
            return (Rect.slot * i) + Margins.top + 5;
          });
      this.svg.selectAll("text").data(data).enter()
        .append("text")
          .attr("class", "occupation-label")
          .attr("fill", "black")
          .text(function(d){
            return d.ocupacion.trim() ? d.ocupacion : Rect.empty;
          })
          .attr("x", Margins.left)
          .attr("y", function(d, i){
            return (Rect.slot * i) + Margins.top;
          });
      console.log(data, range);
      return;

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
            return +d.suma;
          }),
          scale = d3.scale.linear()
                    .domain(extent)
                    .range(x);
      return scale;
    },

    get_range : function(){
      return Current_range;
    },

    //
    // [ GENERATE THE CONTAINER ]
    //
    //
    make_svg : function(){
      var svg = d3.select(this.el).append("svg")
        .attr("width", Margins.width)
        .attr("height", Margins.height)
        .attr("class", "main_graph")
        .append("g")
          .attr("class", "main_container");

      return svg;
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return occupation;
});