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
  var Backbone   = require('backbone'),
      d3         = require("d3"),
      //noUiSlider = require("nouislider"),
      Color_r    = ["#eee", "#00C186", "#004138"],

  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  // /api/heatmap?from=2015-01-01&to=2015-02-01&table=conteo_infomex_publico
  //URL = "http://inai.skalas.mx/api/",
  //Endpoint = URL + "heatmap",
  //Table    = "conteo_infomex_publico", 
  //Fake     = false,
  //FakeData = "/js/data/heatmap.json",
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
      var that    = this;
      this.svg    = this.make_svg(Margins);
      this.scales = this.make_scales(Margins);
      this.axis   = this.make_axis(this.svg, this.scales, Margins);
      //this.get_data(this.slider.noUiSlider.get());
    },

    //
    // [ RENDER THE HEATMAP ]
    //
    //
    render : function(data){
      var count  = 0,
          days   = this.scales[0].domain(),
          hours  = this.scales[1].domain(),
          max    = d3.max(data, function(n){
            return n.count;
          }),
          min    = d3.min(data, function(n){
            return n.count;
          }),
          color  = d3.scale.linear().domain([min, max]).range(Color_r); 

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
            .attr("fill", color(datum.count));
          count++;
        }, this);
      }, this);
    },

  //
  // D A T A   H A N D L E   F U N C T I O N S
  // --------------------------------------------------------------------------------
  //
/*
  //
  // [ CALL THE API (OR LOAD THE FAKE STUFF ) ]
  //
  //
  get_data : function(range){
    var url, from, to, table, that = this;
    if(!range || Fake){
      url = FakeData;
    }
    else if(range.length === 1){
      from  = "from=" + parseInt(range[0]) + "-01-01";
      to    = "to=" + parseInt(range[0]) + "-12-31";
      table = "table=" + Table;
      url = Endpoint + "?" + from + "&" + to + "&" + table;
    }
    else{
      from  = "from=" + parseInt(range[0]) + "-01-01";
      to    = "to=" + parseInt(range[1]) + "-12-31";
      table = "table=" + Table;
      url = Endpoint + "?" + from + "&" + to + "&" + table;
    }

    d3.json(url, function(error, json){
      if(error){
        that.show_error(error);
      }
      else{
        that.render(json);
      }
    });
  */  

  //
  // [ ALERT THE USER IF THE API DOESN'T WORK ]
  //
  //
  show_error : function(error){
    alert("no se puede establecer conexión con el servidor");
  },


  //
  // U I / U X   F U N C T I O N S
  // --------------------------------------------------------------------------------
  //

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

  }
});

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return heatMap;
});