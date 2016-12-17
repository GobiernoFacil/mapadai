// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : gender_chart_view.js
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
  Format     = d3.format(",s"),
  Current_range = null,
  Margins    = {
    width    : 800,
    height   : 600,
    top      : 40,
    right    : 100,
    bottom   : 20, 
    left     : 100,
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
      this.divs       = null;
      this.svg        = null;
      this.first_time = true;
      this.controller = settings.controller;
      this.dataURL    = settings.dataURL;
    },

    render : function(data, range){
      if(data[0].edadcat){
        data.forEach(function(d){
          d.grupo_edad = d.edadcat;
          d.suma       = d.total;
          d.genero     = d.sexo;
        });
      }

      Margins.height = (_.uniq(_.pluck(data,"grupo_edad")).length * Rect.slot) + Margins.top + Margins.bottom; 
      Current_range  = range;
      if(!this.svg){
        this.svg = this.make_svg(Margins);
      }

      var ages    = ["0 a 17", "18 a 25", "26 a 35", "36 a 45", "46 a 60", "61 a 80", "Mayor de 80", "No especificado"],
          y_scale = d3.scale.ordinal()
            .domain(ages)
            .rangePoints([Margins.top, Margins.height - Margins.bottom]),
          r_scale = d3.scale.linear().domain(d3.extent(data, function(d){
            return +d.suma || +d.total;
          })).range([0, (Margins.width/2) - Margins.right]);
          wx_scale = this.scale(data, true),
          mx_scale = this.scale(data, false);

      // WOMEN STUFF
      var right_axis = d3.svg.axis().scale(y_scale).orient("right");
      this.svg.append("g")
         .attr("class", "right_axis")
         .attr("transform", "translate(" + (Margins.width - Margins.right) +", 0)")
         .call(right_axis);
      
      this.wticks = this.svg.selectAll(".women-gender-ticks").data(wx_scale.ticks(5)).enter()
        .append("g")
        .attr("class", "women-gender-ticks")
        .attr("transform", function(d){
          return "translate(" + wx_scale(d) + ", " + Margins.top + ")";
        })
          .append("line")
            .attr("x0", 0)
            .attr("x1",0)
            .attr("y0", 0)
            .attr("y1", Margins.height - Margins.bottom - Margins.top )
            .style({
              "stroke" : "rgba(0,0,0,0.1)",
              "stroke-width" : 1
            });

      this.svg.selectAll(".women-gender-ticks").append("text")
          .attr("class", "women-gender-tick-label")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text(function(d){
            return Format(d);
          })
          .attr("x", 0)
          .attr("y", Margins.height - Margins.bottom - Margins.top + 15 /*lucky number!*/);

      this.wbars = this.svg.selectAll(".gender-rect-women").data(_.where(data, {genero : "Mujer"})).enter()
        .append("rect")
          .attr("class", "gender-rect-women")
          .attr("fill", "#981F7C")
          .attr("width", function(d){
            return r_scale(+d.suma);
          })
          .attr("height", Rect.height)
          .attr("x", Margins.width/2)
          .attr("y", function(d, i){
            return y_scale(d.grupo_edad);
          });

      // MEN STUFF
      var left_axis = d3.svg.axis().scale(y_scale).orient("left");
      this.svg.append("g")
         .attr("class", "left_axis")
         .attr("transform", "translate(" + (Margins.left) +", 0)")
         .call(left_axis);

      this.mticks = this.svg.selectAll(".men-gender-ticks").data(wx_scale.ticks(5)).enter()
        .append("g")
        .attr("class", "men-gender-ticks")
        .attr("transform", function(d){
          return "translate(" + mx_scale(d) + ", " + Margins.top + ")";
        })
          .append("line")
            .attr("x0", 0)
            .attr("x1",0)
            .attr("y0", 0)
            .attr("y1", Margins.height - Margins.bottom - Margins.top + 15 )
            .style({
              "stroke" : "rgba(0,0,0,0.1)",
              "stroke-width" : 1
            });

      this.svg.selectAll(".men-gender-ticks").append("text")
          .attr("class", "men-gender-tick-label")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text(function(d){
            return Format(d);
          })
          .attr("x", 0)
          .attr("y", Margins.height - Margins.bottom  - Margins.top + 15);

      this.mbars = this.svg.selectAll(".gender-rect-men").data(_.where(data, {genero : "Hombre"})).enter()
        .append("rect")
          .attr("class", "gender-rect-men")
          .attr("fill", "#3498DB")
          .attr("width", function(d){
            return r_scale(+d.suma);
          })
          .attr("height", Rect.height)
          .attr("x", function(d){
            return Margins.width/2 - r_scale(+d.suma);
          })
          .attr("y", function(d, i){
            return y_scale(d.grupo_edad);
          });

      return;
    },

    scale : function(data, women){
      var x      = women ? [Margins.width/2, Margins.width - Margins.right] : [Margins.width/2, Margins.left],
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