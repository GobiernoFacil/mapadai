// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : timelines_view.js
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
      URL      = "/js/data/timeline.json",
  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  Categories = [],
  Margins = {
    width    : 800,
    height   : 600,
    top      : 20,
    right    : 30,
    bottom   : 40, 
    left     : 40,
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
  var timeline = Backbone.View.extend({
    
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
      this.svg = new SVG(this.el, Margins);
      this.draw_labels(this.svg);
    },

    //
    // [ RENDER THE GRAPH ]
    //
    //
    render : function(data){
      var d = data;
        this.prepare_data(d);
        this.set_scales(d);
        this.set_axis();
        this.get_line_generator();
        this.draw_lines(d);
    },

    //
    // [ DATA CONFIG ]
    //
    //
    prepare_data : function(data){
      data.map(function(d, i){
        if(Categories.indexOf(d.dependencia) == -1){
          Categories.push(d.dependencia);
        }
        d.total = +d.total;
        d.date  = new Date(d.year, d.month, 1);
      }, this);
    }, 

    //
    // U I / U X   F U N C T I O N S
    // --------------------------------------------------------------------------------
    //

    //
    // [ GENERATE THE SCALES ]
    //
    //
    set_scales : function(data){

      var max = d3.max(data, function(d, i){
        return +d.total;
      }),
      ext = d3.extent(data, function(d){
        return d.date;
      }),
      y = d3.scale.linear()
            .domain([0, max])
            .range([Margins.height - Margins.bottom, Margins.top ]),
      x = d3.time.scale()
            .domain(ext)
            .range([Margins.left, Margins.width - Margins.left - Margins.right]);
            //.ticks(d3.time.year, 1);

      this.scales = [x, y];
    },

    //
    // [ GENERATE THE AXIS ]
    //
    //
    set_axis : function(){
      var x_axis = d3.svg.axis()
                     .scale(this.scales[0])
                     .orient("bottom")
                     .tickValues(this.scales[0].ticks(d3.time.year, 1)),
          y_axis = d3.svg.axis()
                     .scale(this.scales[1])
                     .orient("left")
                     .tickFormat(d3.format("d")),
      Time = this.svg.append("g")
         .attr("class", "x_axis")
         .attr("transform", "translate(0," + (Margins.height - Margins.bottom )+")")
         .call(x_axis),
      Value = this.svg.append("g")
         .attr("class", "y_axis")
         .attr("transform", "translate(" + (Margins.left) +", 0)")
         .call(y_axis);
    },

    //
    // [ GENERATE THE LINE FUNCTION ]
    //
    //
    get_line_generator : function(){
      var that = this,
          line = d3.svg.line()
                   .x(function(d){
                    return that.scales[0](d.date);
                   })
                   .y(function(d){
                    return that.scales[1](d.total);
                   });
      this.line = line;
    },

    //
    // [ DRAW LINES ]
    //
    //
    draw_lines : function(data){
      Categories.forEach(function(cat, i){
        var m    = _.where(data, {dependencia : cat}),
            cn   = this.svg.append("g").attr("class", "line-container"),
            line = cn.append("path").attr("d", this.line(m))
                     .attr("fill", "none")
                     .attr("stroke", "rgba(0,193,165,0.7)")
                     .attr("stroke-width", 1);
      }, this);
    },

    //
    // [ DRAW USERS LIST ]
    //
    //
    draw_list : function(){
      console.log(Categories);
    },

    draw_labels : function(svg){

      svg.append("text")
        .attr("text-anchor", "middle")
        .attr("stroke", "black")
        //.attr("transform", )
        .text("Peticiones");
      /*
      // now add titles to the axes
        vis.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Value");
        vis.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
            .text("Date");
      */
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return timeline;
});