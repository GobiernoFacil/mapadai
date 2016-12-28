// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : multicolor_chart_view.js
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
  First_time    = true,
  Format        = d3.format(",s"),
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
    height : 10,
    fill   : "#3498DB",
    colors : ["#242B40","#1AB6D9", "#1AC6D9", "#D9A74A", "#BF612A",  "#DF3190", "#A69203","#10E684", "#F4A775"],
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
  var colorBars = Backbone.View.extend({
    
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
      this.controller = settings.controller;
      this.dataURL    = settings.dataURL;
      this.type       = settings.type;
    },

    render : function(data, range){
      var that = this;
      Current_range = range;
      this.__data = data;
      this.map_data();
      this.scale = this._scale(this.data);
      
      Margins.height = (this.data.length * Rect.slot) + Margins.top + Margins.bottom;

      if(!this.svg){
        this.svg = this.make_svg(Margins);
      }

      // Las líneas verticales
      this.svg.selectAll(".multicolor-ticks").remove();
      this.ticks = this.svg.selectAll(".multicolor-ticks").data(this.scale.ticks());
      this.ticks.enter()
        .append("g")
        .attr("class", "multicolor-ticks")
        .attr("transform", function(d){
          return "translate(" + that.scale(d) + ", 0)";
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


      this.ticks_top_labels = this.svg.selectAll(".multicolor-ticks");
      this.ticks_top_labels.selectAll(".multicolor-tick-label-top").remove();
      this.ticks_top_labels.append("text")
          .attr("class", "multicolor-tick-label-top")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text(function(d){
            return Format(d);
          })
          .attr("x", 0)
          .attr("y", 10);

      this.ticks_bottom_labels = this.svg.selectAll(".multicolor-ticks");
      this.ticks_bottom_labels.selectAll(".multicolor-tick-label-bottom").remove();
      
      this.ticks_bottom_labels.append("text")
          .attr("class", "multicolor-tick-label-bottom")
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text(function(d){
            return Format(d);
          })
          .attr("x", 0)
          .attr("y", Margins.height - Margins.bottom);

      this.bars = this.svg.selectAll(".multicolor-rect-media").data(this.data);
      this.bars.enter()
        .append("rect")
          .attr("class", "multicolor-rect-media")
          .attr("fill", Rect.fillw)
          .attr("width", function(d){
            return that.scale(d.total);
          })
          .attr("height", Rect.height)
          .attr("x", Margins.left)
          .attr("y", function(d, i){
            return (Rect.slot * i) + Margins.top + 5;
          });

      this.bars.attr("width", function(d){
            return that.scale(d.total);
          });
         

      this.bars.exit().remove();

      this.multicolor_labels = this.svg.selectAll(".multicolor-label").data(this.data);

      this.multicolor_labels.enter()
        .append("text")
          .attr("class", "multicolor-label")
          .attr("fill", "black")
          .text(function(d){
            return d.dependencia.trim() ? (d.dependencia + " : " + d.total) : Rect.empty;
          })
          .attr("x", Margins.left)
          .attr("y", function(d, i){
            return (Rect.slot * i) + Margins.top;
          });

      this.multicolor_labels
          .text(function(d){
            return d.dependencia.trim() ? (d.dependencia + " : " + d.total) : Rect.empty;
          });

      this.multicolor_labels.exit().remove();

      return;
    },

    _scale : function(data){
      var x       = [Margins.left, Margins.width - Margins.left - Margins.right],
          x_array = _.pluck(data, "total"),
          extent  = d3.extent(x_array),
          scale   = d3.scale.linear()
                    .domain([0, extent[1]])
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
    },

    map_data : function(){
      var solicitudes   = _.uniq(_.pluck(this.__data, "tiposolicitud")),
          _dependencias = _.uniq(_.pluck(this.__data, "dependencia")),
          dependencias  = _dependencias.map(function(d){
            var r = {
              dependencia : d,
              data        : _.where(this.__data, {dependencia : d})
            };

            r.total = r.data.reduce(function(a, b){
                        var a = a.total ? Number(a.total) : a;
                        var b = b.total ? Number(b.total) : b;
                        return a + b;
                      }, 0);

            /*
            solicitudes.forEach(function(s){
              r[s] = _.where(r.data, {tiposolicitud : s});
            }, this);
            */

            return r;
          }, this);

      dependencias = _.sortBy(dependencias, function(s){return -s.total});

      console.log(_.pluck(dependencias, "total"));

      this.data    = dependencias;
      this.options = solicitudes;
    },
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return colorBars;
});