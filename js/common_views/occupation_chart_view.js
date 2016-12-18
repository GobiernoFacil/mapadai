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
    top      : 40,
    right    : 30,
    bottom   : 20, 
    left     : 30,
    padding  : 0,
    oPadding : 15
  },
  Rect = {
    height : 5,
    fill   : "#3498DB",
    fillw  : "#981F7C",
    slot   : 30, // el espacio entre rectángulo y rectángulo
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
    initialize : function(settings){
      this.divs = null;
      this.svg  = null;
      this.controller = settings.controller;
      this.dataURL    = settings.dataURL;
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

      this.ticks = this.svg.selectAll("g").data(x_scale.ticks());

      this.ticks.enter()
        .append("g")
        .attr("class", "occupation-ticks")
        .attr("transform", function(d){
          return "translate(" + x_scale(d) + ", 0)";
        })
          .append("line")
            .attr("x0", 0)
            .attr("x1",0)
            .attr("y0", 30)
            .attr("y1", Margins.height - Margins.bottom )
            .style({
              "stroke" : "#ddd",
              "stroke-width" : 1
            });
      this.ticks.exit().remove();

      this.ticks_top_labels = this.svg.selectAll(".occupation-ticks");
      this.ticks_top_labels.selectAll(".occupation-tick-label-top").remove();
      this.ticks_top_labels.append("text")
          .attr("class", "occupation-tick-label-top")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text(function(d){
            return Format(d);
          })
          .attr("x", 0)
          .attr("y", 10);

      this.ticks_bottom_labels = this.svg.selectAll(".occupation-ticks");
      this.ticks_bottom_labels.selectAll(".occupation-tick-label-bottom").remove();
      
      this.ticks_bottom_labels.append("text")
          .attr("class", "occupation-tick-label-bottom")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text(function(d){
            return Format(d);
          })
          .attr("x", 0)
          .attr("y", Margins.height - Margins.bottom);
      


      this.bars = this.svg.selectAll(".occupation-rect-men").data(data).enter()
        .append("rect")
          .attr("class", "occupation-rect-men")
          .attr("fill", Rect.fill)
          .attr("width", function(d){
            return x_scale(+d.suma);
          })
          .attr("height", Rect.height)
          .attr("x", Margins.left)
          .attr("y", function(d, i){
            return (Rect.slot * i) + Margins.top + 5;
          });

      this.bars2 = this.svg.selectAll(".occupation-rect-women").data(data).enter()
        .append("rect")
          .attr("class", "2occupation-rect-women")
          .attr("fill", Rect.fillw)
          .attr("width", function(d){
            return x_scale(+d.suma)/2;
          })
          .attr("height", Rect.height)
          .attr("x", Margins.left)
          .attr("y", function(d, i){
            return (Rect.slot * i) + Margins.top + 5;
          });

      this.svg.selectAll(".occupation-label").data(data).enter()
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