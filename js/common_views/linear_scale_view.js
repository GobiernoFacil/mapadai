// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : linear_scale_view.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var d3    = require("d3"),
      scale = function(data, layout, field, type){
        var x = [layout.left, layout.width - layout.left - layout.right],
            y = [layout.top, layout.height - layout.top - layout.bottom],
            types = {
              x : x,
              y : y
            },
            extent = d3.extent(data, function(d){
              return +d[field];
            }),
            _scale = d3.scale.linear()
                       .domain(extent)
                       .range(types[type]);
        return _scale;
      };

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return scale;
});