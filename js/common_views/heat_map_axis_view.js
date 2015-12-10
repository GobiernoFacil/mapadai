// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : heat_map_axis_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var d3     = require("d3"),
      x_axis = null, 
      y_axis = null,
      Value  = null,
      Time   = null,
      axis   = function(svg, scales, layout){
        x_axis = d3.svg.axis().scale(scales[0]).orient("bottom"),
        y_axis = d3.svg.axis().scale(scales[1]).orient("left");

        Time = svg.append("g")
         .attr("class", "x_axis")
         .attr("transform", "translate(0," + (layout.height - layout.bottom )+")")
         .call(x_axis);
        Value = svg.append("g")
         .attr("class", "y_axis")
         .attr("transform", "translate(" + (layout.left) +", 0)")
         .call(y_axis);

        svg.selectAll("path.domain").style("fill", "none").style("stroke", "black");
        svg.selectAll("line").style("stroke", "black");

        return [Time, Value];
      };

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return axis;
});