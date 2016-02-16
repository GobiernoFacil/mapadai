// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : heat_map_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone = require('backbone'),
      d3       = require("d3"),
      Color_r  = ["#eee", "#00C186", "#004138"],

  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  Format        = d3.format(","),
  Current_range = null,
  Margins = {
    width    : 600,
    height   : 600,
    top      : 20,
    right    : 30,
    bottom   : 100, 
    left     : 30,
    padding  : 0,
    oPadding : 15
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  /*
  <ul class="legend right">
                <li class="zero"><b></b> 0</li>
                <li class="fifty"><b></b> 50</li>
                <li class="max"><b></b> 100</li>
              </ul>
  */
  Zero_label  = document.querySelector("ul.legend li.zero span"),
  Fifty_label = document.querySelector("ul.legend li.fifty span"),
  Max_label   = document.querySelector("ul.legend li.max span");
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var heatMap = Backbone.View.extend({
    
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
    initialize : function(settings){
      var that    = this;
      this.svg    = this.make_svg(Margins);
      this.scales = this.make_scales(Margins);
      this.axis   = this.make_axis(this.svg, this.scales, Margins);
      this.controller = settings.controller;
    },

    //
    // [ RENDER THE HEATMAP ]
    //
    //
    render : function(data, range){
      Current_range = range;
      var that  = this,
          count = 0,
          days  = this.scales[0].domain(),
          hours = this.scales[1].domain(),
          max   = d3.max(data, function(n){
            return +n.count;
          }),
          min   = d3.min(data, function(n){
            return +n.count;
          }),
          color = d3.scale.linear().domain([min, max]).range(Color_r);

          // update labels
          Zero_label.innerHTML  = min;
          Fifty_label.innerHTML = Math.round((max + min)/2);
          Max_label.innerHTML   = max; 

      days.forEach(function(day, i){
        hours.forEach(function(hour, j){
          var datum  = data[count],//Dummy[i + (j*7)],
              x      = this.scales[0](day),
              y      = this.scales[1](hour),
              width  = this.scales[0].rangeBand(),
              height = this.scales[1].rangeBand();
          this.svg.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .attr("stroke", "rgba(255,255,255,0.5)")
            .attr("fill", color(datum.count))
            .on("mouseover", function(d){
              that.controller.create_tooltip({
                title   : day + ", " + (hour < 10? "0".concat(hour) : hour) + ":00",
                content : "peticiones : " + Format(datum.count) + " | fecha : " + Current_range[0] + " - " + Current_range[1]
              });
            })
            .on("mouseout", function(d){
              that.controller.remove_tooltip();
            });
          count++;
        }, this);
      }, this);
    },

  //
  // U I / U X   F U N C T I O N S
  // --------------------------------------------------------------------------------
  //

    //
    // [ DRAW TOOLTIPS ]
    //
    //
    draw_tooltips : function(data){
      var that   = this,
          labels = this.svg.selectAll(".amount").data(data).enter()
                     .append("g")
                       .attr("class", "amount")
                       .attr("transform", function(d){
                         var x   = that.scales[0](d.date),
                             y   = that.scales[1](d.total),
                             txt = "translate(" + x + ", " + y + ")"; 
                         return txt;
                       });
      labels.append("text").text(function(d){
        return Format(d.total);
      });
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

  //
  // [ GENERATE THE SCALES ]
  //
  //
  make_scales : function(){
    var x_scale = d3.scale.ordinal()
      .domain(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"])
      .rangeBands([Margins.left, Margins.width - Margins.right]),
        y_scale = d3.scale.ordinal()
      .domain(d3.range(24))
      .rangeBands([Margins.top, Margins.height - Margins.bottom]);
    return [x_scale, y_scale];
  },

  //
  // [ GENERATE THE AXIS ]
  //
  //
  make_axis : function(svg, scales, layout){
    var x_axis = d3.svg.axis().scale(scales[0]).orient("bottom"),
        y_axis = d3.svg.axis().scale(scales[1]).orient("left"),
        Time   = svg.append("g")
         .attr("class", "x_axis")
         .attr("transform", "translate(0," + (layout.height - layout.bottom )+")")
         .call(x_axis);
        Value  = svg.append("g")
         .attr("class", "y_axis")
         .attr("transform", "translate(" + (layout.left) +", 0)")
         .call(y_axis);

    svg.selectAll("path.domain").style("fill", "none").style("stroke", "#f2f2f2");
    svg.selectAll("line").style("stroke", "#f2f2f2");

  },

  get_range : function(){
    return Current_range;
  }
});

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return heatMap;
});