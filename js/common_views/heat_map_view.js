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
      //SVG      = require("common_views/main_svg_view"),
      //Scales   = require("common_views/heat_map_scales_view"),
      //Axis     = require("common_views/heat_map_axis_view"), 
      Color_r  = ["white", "green"],
      Dummy    = [{"how":0,"count":"3"},{"how":1,"count":"3"},{"how":2,"count":"3"},{"how":3,"count":"3"},{"how":4,"count":"3"},{"how":5,"count":"3"},{"how":6,"count":"3"},{"how":7,"count":"3"},{"how":8,"count":"3"},{"how":9,"count":"3"},{"how":10,"count":"3"},{"how":11,"count":"3"},{"how":12,"count":"3"},{"how":13,"count":"3"},{"how":14,"count":"3"},{"how":15,"count":"3"},{"how":16,"count":"3"},{"how":17,"count":"4"},{"how":18,"count":"4"},{"how":19,"count":"4"},{"how":20,"count":"4"},{"how":21,"count":"4"},{"how":22,"count":"4"},{"how":23,"count":"4"},{"how":24,"count":"4"},{"how":25,"count":"4"},{"how":26,"count":"4"},{"how":27,"count":"4"},{"how":28,"count":"4"},{"how":29,"count":"4"},{"how":30,"count":"4"},{"how":31,"count":"4"},{"how":32,"count":"4"},{"how":33,"count":"4"},{"how":34,"count":"4"},{"how":35,"count":"4"},{"how":36,"count":"4"},{"how":37,"count":"4"},{"how":38,"count":"4"},{"how":39,"count":"4"},{"how":40,"count":"4"},{"how":41,"count":"4"},{"how":42,"count":"4"},{"how":43,"count":"4"},{"how":44,"count":"4"},{"how":45,"count":"4"},{"how":46,"count":"4"},{"how":47,"count":"4"},{"how":48,"count":"4"},{"how":49,"count":"4"},{"how":50,"count":"4"},{"how":51,"count":"4"},{"how":52,"count":"4"},{"how":53,"count":"4"},{"how":54,"count":"4"},{"how":55,"count":"4"},{"how":56,"count":"4"},{"how":57,"count":"4"},{"how":58,"count":"4"},{"how":59,"count":"4"},{"how":60,"count":"4"},{"how":61,"count":"4"},{"how":62,"count":"4"},{"how":63,"count":"4"},{"how":64,"count":"4"},{"how":65,"count":"4"},{"how":66,"count":"4"},{"how":67,"count":"4"},{"how":68,"count":"4"},{"how":69,"count":"4"},{"how":70,"count":"4"},{"how":71,"count":"4"},{"how":72,"count":"4"},{"how":73,"count":"4"},{"how":74,"count":"4"},{"how":75,"count":"4"},{"how":76,"count":"4"},{"how":77,"count":"4"},{"how":78,"count":"4"},{"how":79,"count":"4"},{"how":80,"count":"4"},{"how":81,"count":"4"},{"how":82,"count":"4"},{"how":83,"count":"4"},{"how":84,"count":"4"},{"how":85,"count":"4"},{"how":86,"count":"4"},{"how":87,"count":"4"},{"how":88,"count":"4"},{"how":89,"count":"4"},{"how":90,"count":"4"},{"how":91,"count":"4"},{"how":92,"count":"4"},{"how":93,"count":"4"},{"how":94,"count":"4"},{"how":95,"count":"4"},{"how":96,"count":"4"},{"how":97,"count":"4"},{"how":98,"count":"4"},{"how":99,"count":"4"},{"how":100,"count":"4"},{"how":101,"count":"4"},{"how":102,"count":"4"},{"how":103,"count":"4"},{"how":104,"count":"4"},{"how":105,"count":"4"},{"how":106,"count":"4"},{"how":107,"count":"4"},{"how":108,"count":"4"},{"how":109,"count":"4"},{"how":110,"count":"4"},{"how":111,"count":"4"},{"how":112,"count":"4"},{"how":113,"count":"4"},{"how":114,"count":"4"},{"how":115,"count":"4"},{"how":116,"count":"4"},{"how":117,"count":"4"},{"how":118,"count":"4"},{"how":119,"count":"4"},{"how":120,"count":"5"},{"how":121,"count":"5"},{"how":122,"count":"5"},{"how":123,"count":"5"},{"how":124,"count":"5"},{"how":125,"count":"5"},{"how":126,"count":"5"},{"how":127,"count":"5"},{"how":128,"count":"5"},{"how":129,"count":"5"},{"how":130,"count":"5"},{"how":131,"count":"5"},{"how":132,"count":"5"},{"how":133,"count":"5"},{"how":134,"count":"5"},{"how":135,"count":"5"},{"how":136,"count":"5"},{"how":137,"count":"5"},{"how":138,"count":"5"},{"how":139,"count":"5"},{"how":140,"count":"5"},{"how":141,"count":"5"},{"how":142,"count":"5"},{"how":143,"count":"5"},{"how":144,"count":"5"},{"how":145,"count":"5"},{"how":146,"count":"5"},{"how":147,"count":"5"},{"how":148,"count":"5"},{"how":149,"count":"5"},{"how":150,"count":"5"},{"how":151,"count":"5"},{"how":152,"count":"5"},{"how":153,"count":"5"},{"how":154,"count":"5"},{"how":155,"count":"5"},{"how":156,"count":"5"},{"how":157,"count":"5"},{"how":158,"count":"5"},{"how":159,"count":"5"},{"how":160,"count":"5"},{"how":161,"count":"5"},{"how":162,"count":"5"},{"how":163,"count":"5"},{"how":164,"count":"4"},{"how":165,"count":"4"},{"how":166,"count":"4"},{"how":167,"count":"4"}],


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

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      this.svg    = this.make_svg(Margins);
      this.scales = this.make_scales(Margins);
      this.axis   = this.make_axis(this.svg, this.scales, Margins);
      this.render();
    },

    render : function(){
      var count  = 0,
          days   = this.scales[0].domain(),
          hours  = this.scales[1].domain(),
          max    = d3.max(Dummy, function(n){
            return n.count;
          }),
          color  = d3.scale.linear().domain([0, max]).range(Color_r); 

      days.forEach(function(day, i){
        hours.forEach(function(hour, j){
          var datum  = Dummy[count],//Dummy[i + (j*7)],
              x      = this.scales[0](day),
              y      = this.scales[1](hour),
              width  = this.scales[0].rangeBand(),
              height = this.scales[1].rangeBand();
          this.svg.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", color(datum.count));
          count++;
        }, this);
      }, this);
    },

  //
  // U I / U X   F U N C T I O N S
  // --------------------------------------------------------------------------------
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

  make_scales : function(){
    var x_scale = d3.scale.ordinal()
      .domain(["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"])
      .rangeBands([Margins.left, Margins.width - Margins.right]),
        y_scale = d3.scale.ordinal()
      .domain(d3.range(24))
      .rangeBands([Margins.top, Margins.height - Margins.bottom]);
    return [x_scale, y_scale];
  },

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

        svg.selectAll("path.domain").style("fill", "none").style("stroke", "black");
        svg.selectAll("line").style("stroke", "black");

    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return heatMap;
});