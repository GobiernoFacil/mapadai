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
      //Bar      = require("text!templates/bar.html"),
      //Axis     = require("common_views/heat_map_axis_view"), 
      //Color_r  = ["white", "green"],
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
  var heatMap = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
   
    },

    //
    // [ DEFINE THE TEMPLATES ]
    //
    //bar : _.template(Bar),

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      //this.svg     = new SVG(this.el, Margins);
      this.x_scale = new Scale(Dummy, Margins, "total", "x");
      this.render();
      //this.scales = new Scales(Margins);
      //this.axis   = new Axis(this.svg, this.scales, Margins);

      //this.render();
    },

    render : function(){
      /*
      Dummy.forEach(function(d){
        this.$el.append(this.bar(d));
      }, this);
      */
      var that = this,
          divs = d3.select(this.el).selectAll("div")
        .data(Dummy)
        .enter()
        .append("div")
        .attr("class", "container");

      divs.append("p")
      .html(function(d){
        return d.dependencia;
      });

      divs.append("div")
        .attr("class", "bar")
        .style({
            background : "grey",
            height : "30px",
            width : function(d){
              //console.log(d, that.x_scale(d.total));
              return that.x_scale(d.total) + "px";
            }
        });
    }

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return heatMap;
});