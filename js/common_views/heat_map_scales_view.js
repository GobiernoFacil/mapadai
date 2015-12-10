// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : heat_map_scales_view.js
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
      scales = function(layout){
        var x_scale = d3.scale.ordinal()
          .domain(["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"])
          .rangeBands([layout.left, layout.width - layout.right]);
        y_scale = d3.scale.ordinal()
          .domain(d3.range(24))
          .rangeBands([layout.top, layout.height - layout.bottom]);

        return [x_scale, y_scale];
      };

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return scales;
});