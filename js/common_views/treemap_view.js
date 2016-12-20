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
      Color_r  = ["#242B40","#1AB6D9", "#1AC6D9", "#D9A74A", "#BF612A",  "#DF3190", "#A69203","#10E684", "#F4A775", "#DB5F3E",
      			  "#F95E20","#8C84D4", "#9560AD", "#AE585D", "#ECAA8F",  "#DDDCC8", "#6B8EBE","#46BDBF", "#F2684B", "#F2385A",
      			  "#F5A402","#EBF2E1", "#4AD9D9", "#36B2BF", "#B30342",  "#138DED", "#FF4D78","#7B20ED", "#C3A35F", "#84BA00"],
      color_s = ["#9DDCED","#91C9E8","#67B8DE","#00A6DE"],


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
  Format = d3.format(","),
  FirstTime = true,
  Current_range = null,
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
    initialize : function(settings){
      this.svg        = null;
      this.treemap    = null;
      this.scales     = null;
      this.controller = settings.controller;
      this.dataURL    = settings.dataURL;
      this.set_scales();
      
    },

    _remove : function(){
      if(this.svg){
        // return d3(this.svg.remove();
        return d3.select(this.svg.node().parentNode).remove();
      }
      else{
        return null;
      }
    },

    render : function(r, range){
      Current_range = range;
      if(this.svg) this._remove();
      var that   = this,
          margin = {top: Margins.top, right: Margins.right, bottom: Margins.bottom, left: Margins.left},
          width  = Margins.width,
          height = Margins.height - Margins.top - Margins.bottom,
          formatNumber = d3.format(",d");          
      /* create x and y scales */
      var x = d3.scale.linear()
               .domain([0, width])
               .range([0, width]);
      
      var y = d3.scale.linear()
                .domain([0, height])
                .range([0, height]);
	  
	  // adding a color scale
	  var color = d3.scale.linear()
	  				.domain([0, 110000])
	  				.range(color_s);
    
      var treemap = d3.layout.treemap()
                      .children(function(d, depth) { return  d.children; })
                      .sort(function(a, b) { return a.value - b.value; })
                      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
                      .value(function(d){
                        return +d.total;
                      })
                      .round(false);
      this.treemap = treemap;

      /* create svg */
      var svg = d3.select(this.el).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.bottom + margin.top)
                  .style("margin-left", -margin.left + "px")
                  .style("margin.right", -margin.right + "px")
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .style("shape-rendering", "crispEdges");
      this.svg = svg;

      var grandparent = svg.append("g")
                          .attr("class", "grandparent");

      grandparent.append("rect")
        .attr("y", -margin.top)
        .attr("width", width)
        .attr("height", margin.top);

      grandparent.append("text")
        .attr("x", 6)
        .attr("y", 6 - margin.top)
        .attr("dy", ".75em");

/* load in data, display root */
  function xxx(r) {
  root = {name : "mapadai", children: r[0].mapadai};
  //console.log("initialize", root);
  that.initialize_treemap(root);
  that.accumulate(root, "total");
  that.accumulate(root, "value");
  that.layout(root);
  display(root);
  FirstTime = false;

  /* display show the treemap and writes the embedded transition function */
  function display(d){
    /* create grandparent bar at top */
    grandparent
        .datum(d.parent)
        .on("click", transition)
      .select("text")
        .text(name(d));

    var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");
    
    /* add in data */
    var g = g1.selectAll("g")
        .data(d.children)
      .enter().append("g");

    /* transition on child click */
    g.filter(function(d) { return d.children; })
        .classed("children", true)
        .on("click", transition);
    
    /* write children rectangles */
    g.selectAll(".child")
        .data(function(d) { return d.children || [d]; })
      .enter().append("rect")
        .attr("class", "child")
        .call(rect);

    /* write parent rectangle */
    g.append("rect")
        .attr("class", "parent")
        .call(rect)
        /* open new window based on the json's URL value for leaf nodes */
        /* Chrome displays this on top */
        .on("click", function(d) { 
            if(!d.children){
                // window.open(d.url); 
                console.log("last child",d);
            }
        })
        .on("mouseover", function(d){
          that.controller.create_tooltip({
            title   : d.name,
            content : "peticiones : " + Format(d.total) + " | fecha : " + Number(Current_range[0]) + " - " + Number(Current_range[1])
          });
        })
        .on("mouseout", function(d){
          that.controller.remove_tooltip();
        });
      //.append("title")
        //.text(function(d) { return formatNumber(d.value); });
    
    /* Adding a foreign object instead of a text object, allows for text wrapping */
    g.append("foreignObject")
        .call(rect)
        /* open new window based on the json's URL value for leaf nodes */
        /* Firefox displays this on top */
        .on("click", function(d) { 
            if(!d.children){
                //window.open(d.url); 
                console.log("last child",d);
            }
        })
        .on("mouseover", function(d){
          that.controller.create_tooltip({
            title   : d.name,
            content : "peticiones : " + Format(d.total) + " | fecha : " + Current_range[0] + " - " + Current_range[1]
          });
        })
        .on("mouseout", function(d){
          that.controller.remove_tooltip();
        })
        .attr("class","foreignobj")
        .append("xhtml:div") 
            .attr("dy", ".75em")
            .html(function(d) { return d.name + ": " + Format(d.total); })
            .attr("class","textdiv"); //textdiv class allows us to style the text easily with CSS

    /* create transition function for transitions */
    function transition(d) {
      console.log("transition", d);
      if (Transitioning || !d) return;
      Transitioning = true;

      var g2 = display(d),
          t1 = g1.transition().duration(750),
          t2 = g2.transition().duration(750);

      // Update the domain only after entering new elements.
      x.domain([d.x, d.x + d.dx]);
      y.domain([d.y, d.y + d.dy]);

      // Enable anti-aliasing during the transition.
      svg.style("shape-rendering", null);

      // Draw child nodes on top of parent nodes.
      svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

      // Fade-in entering text.
      g2.selectAll("text").style("fill-opacity", 0);
      g2.selectAll("foreignObject div").style("display", "none"); /*added*/

      // Transition to the new view.
      t1.selectAll("text").call(that.text).style("fill-opacity", 0);
      t2.selectAll("text").call(that.text).style("fill-opacity", 1);
      t1.selectAll("rect").call(rect);
      t2.selectAll("rect").call(rect);
      
      t1.selectAll(".textdiv").style("display", "none"); /* added */
      t1.selectAll(".foreignobj").call(foreign);
      t2.selectAll(".textdiv").style("display", "block"); /* added */
      t2.selectAll(".foreignobj").call(foreign); /* added */      

      // Remove the old node when the transition is finished.
      t1.remove().each("end", function() {
        svg.style("shape-rendering", "crispEdges");
        Transitioning = false;               
      });
      
    }//endfunc transition

    
    return g;
  } //endfunc display

  function rect(rect) {
    rect.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })   
        .attr("fill", function(d, i) {return color(d.total)})
  }

  function foreign(foreign){  /* added */
      foreign.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
  }

  function name(d) {
    return d.parent ? name(d.parent) + "." + d.name : d.name;
  }
} //endfunc xxx

      xxx(r);
    },

    //
    // D E F I N E   T H E   T R E E M A P   H E L P E R S
    // --------------------------------------------------------------------------------
    //
    initialize_treemap : function(root) {
      root.x     = root.y = 0;
      root.dx    = Margins.width;
      root.dy    = Margins.height - Margins.top - Margins.bottom;
      root.depth = 0;
    },

    // Aggregate the values for internal nodes. This is normally done by the
    // treemap layout, but not here because of our custom implementation.
    accumulate : function(d, key) {
      var that = this;
      var ac = d.children ? d[key] = d.children.reduce(function(p, v){
        return p + that.accumulate(v, key);
      }, 0) : (d[key] ? d[key] : 0);
      return ac;
    },

    // Compute the treemap layout recursively such that each group of siblings
    // uses the same size (1×1) rather than the dimensions of the parent cell.
    // This optimizes the layout for the current zoom state. Note that a wrapper
    // object is created for the parent node for each group of siblings so that
    // the parent’s dimensions are not discarded as we recurse. Since each group
    // of sibling was laid out in 1×1, we must rescale to fit using absolute
    // coordinates. This lets us use a viewport to zoom.
    layout : function(d){
      var that = this;
      if(d.children){
        this.treemap.nodes({children: d.children});
        d.children.forEach(function(c) {
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
          that.layout(c);
        });
      }
    },

    text : function(text){
      var that = this;
      text.attr("x", function(d) { return that[0](d.x) + 6; })
          .attr("y", function(d) { return that[1](d.y) + 6; });
    },


    set_scales : function(){
      var x = d3.scale.linear()
               .domain([0, Margins.width])
               .range([0, Margins.width]);
      
      var y = d3.scale.linear()
                .domain([0, Margins.height - Margins.top - Margins.bottom])
                .range([0, Margins.height - Margins.top - Margins.bottom]);
      this.scales = [x, y];
    },

    get_range : function(){
      return Current_range;
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return treeMap;
});