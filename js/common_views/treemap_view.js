// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js/common_views
// @file     : treemap_view.js
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

  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  Margins = {
    width    : 600,
    height   : 600,
    top      : 20,
    right    : 0,
    bottom   : 0, 
    left     : 0,
    padding  : 0,
    oPadding : 0
  },
  Width  = Margins.width,
  Height = Margins.height - Margins.top,
  URL    = "/js/data/treedata.json",
  Transitioning;

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var treeMap = Backbone.View.extend({
    
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
      var that = this;
      this.svg    = new SVG(this.el, Margins);
      this.set_scales();
      this.set_treemap();
      this.set_grandparent();
      
      d3.json(URL, function(root){
        that.init(root);
        that.accumulate(root);
        that.layout(root);
        //that.display(root);
      });
    },

    init : function(root){
      root.x = root.y = 0;
      root.dx = Width;
      root.dy = Height;
      root.deep = 0;
    },

    accumulate : function(d){
      var that = this;
      return d.children ? d.value = d.children.reduce(function(p, v){
        return p + that.accumulate(v);
      }, 0) : d.value;
    },

    layout : function(d){
      if(d.children){
        this.treemap.nodes({children:d.children});
        d.children.forEach(function(c){
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
          this.layout(c);
        }, this);
      }
    },

    set_scales : function(){
      var x = d3.scale.linear()
                .domain([0, Width])
                .range([0, Width]),
          y = d3.scale.linear()
                .domain([0, Height])
                .range([0, Height]);

      this.scales = [x,y];
    },

    set_treemap : function(){
      var treemap = d3.layout.treemap()
                    .children(function(d, depth){return depth ? null : d.children})
                    .sort(function(a,b){return a.value - b.value;})
                    .ratio( (Height / Width) * .5 * (1+Math.sqrt(5)))
                    .round(false);

      this.treemap = treemap;
    },

    set_grandparent : function(){
      var grandparent = this.svg.append("g").attr("class", "grandparent");

      grandparent.append("rect")
        .attr("y", -Margins.top)
        .attr("width", Width)
        .attr("height", Margins.top);

      grandparent.append("text")
        .attr("x", 6)
        .attr("y", 6)
        .attr("dy", ".75em");
    }

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return treeMap;
});