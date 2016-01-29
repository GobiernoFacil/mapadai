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
      Dummy    = [{"dependencia":"INSTITUTO MEXICANO DEL SEGURO SOCIAL","total":"25375"},{"dependencia":"SECRETARÃA DE EDUCACIÃ“N PÃšBLICA","total":"6238"},{"dependencia":"INSTITUTO DE SEGURIDAD Y SERVICIOS SOCIALES DE LOS TRABAJADORES DEL ESTADO","total":"5766"},{"dependencia":"SECRETARÃA DE SALUD","total":"4806"},{"dependencia":"PROCURADURÃA GENERAL DE LA REPÃšBLICA","total":"3793"},{"dependencia":"SECRETARÃA DE GOBERNACIÃ“N (INCLUYE LA ENTONCES SECRETARÃA DE SEGURIDAD PÃšBLICA)","total":"3754"},{"dependencia":"SECRETARÃA DE MEDIO AMBIENTE Y RECURSOS NATURALES","total":"3491"},{"dependencia":"SECRETARÃA DE COMUNICACIONES Y TRANSPORTES","total":"3123"},{"dependencia":"COMISIÃ“N FEDERAL PARA LA PROTECCIÃ“N CONTRA RIESGOS SANITARIOS","total":"2949"},{"dependencia":"PETRÃ“LEOS MEXICANOS","total":"2755"}];

  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  Margins = {
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
      //this.x_scale = new Scale(Dummy, Margins, "total", "x");
      //this.render();
    },

    render : function(data){
      var x_scale = new Scale(data, Margins, "total", "x"),
          divs    = d3.select(this.el).selectAll("div")
                      .data(data)
                      .enter()
                      .append("div")
                      .attr("class", "content-top");

      divs.append("p")
        .html(function(d){
          return d.dependencia;
        });

      divs.append("div")
        .attr("class", "bar")
        .style({
          background : "#00c1a5",
          height : "30px",
          width : function(d){
            return x_scale(d.total) + "px";
          }
        });
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return top10;
});