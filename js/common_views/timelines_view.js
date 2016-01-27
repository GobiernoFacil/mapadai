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
  First_time = true,
  Categories = [],
  Data       = null,
  Current_data = null,
  Margins    = {
    width    : 800,
    height   : 600,
    top      : 20,
    right    : 30,
    bottom   : 40, 
    left     : 70,
    numbers  : 10,
    dates    : 0,
    padding  : 0,
    oPadding : 15
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S   A N D   T E M P L A T E S
  // --------------------------------------------------------------------------------
  //
  LI = "<li><a class='category-toggle' data-category='<%=name%>' href='#'><b></b><%=name%></a></li>";
  
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var timeline = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      'click .category-toggle' : 'update_lines'
    },

    //
    // [ DEFINE THE TEMPLATES ]
    //
    li : _.template(LI),

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
      Data  = data;
      var d = data;
      this.prepare_data(d);
      this.set_scales(d);
      this.set_axis();
      this.get_line_generator();
      this.draw_lines(d);
      this.draw_list();
      First_time = false;
    },

    //
    // I N T E R A C T I O N   F U N C T I O N S
    // --------------------------------------------------------------------------------
    //
    update_lines : function(e){
      e.preventDefault();

      if(e.currentTarget.classList.toggle("disabled")){
        // hide the line
        this.update_data(e.currentTarget.getAttribute("data-category"), true);
      }
      else{
        // show the line
        this.update_data(e.currentTarget.getAttribute("data-category"), true);
      }
    },


    //
    // D A T A   F U N C T I O N S
    // --------------------------------------------------------------------------------
    //

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

      Current_data = data;
    },

    //
    // [ UPDATE DATA ]
    //
    //
    update_data : function(category, add){
      // [1] update the data
      if(add && !_.findWhere(Current_data, {dependencia : category})){
        var d = _.where(Data, {dependencia : category});
        Current_data = Current_data.concat(d);
      }
      else{
        Current_data = _.filter(Current_data, function(val){
          return val.dependencia != category;
        });
      }

      // [2] generate the helpers again
      this.set_scales(Current_data);
      this.get_line_generator();
      this.set_axis(true);
      /*
      *this.set_scales(d);
      this.set_axis();
      *this.get_line_generator();
      this.draw_lines(d);
      this.draw_list();
      */
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
    set_axis : function(update){
      var x_axis = d3.svg.axis()
                     .scale(this.scales[0])
                     .orient("bottom")
                     .tickValues(this.scales[0].ticks(d3.time.year, 1)),
          y_axis = d3.svg.axis()
                     .scale(this.scales[1])
                     .orient("left")
                     .tickFormat(d3.format("d"));

      if(!update){
        var Time = this.svg.append("g")
         .attr("class", "x_axis")
         .attr("transform", "translate(0," + (Margins.height - Margins.bottom )+")")
         .call(x_axis),
            Value = this.svg.append("g")
         .attr("class", "y_axis")
         .attr("transform", "translate(" + (Margins.left) +", 0)")
         .call(y_axis);
      }
      else{
        this.svg.select(".x_axis")
        .transition().duration(1500).ease("sin-in-out")
        .call(x_axis); 
        this.svg.select(".y_axis")
        .transition().duration(1500).ease("sin-in-out")
        .call(y_axis); 
      }
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
      console.log(Data);

      var divrow 	= document.createElement("div"),
      	  divcol 	= document.createElement("div"),
       	  ul 		= document.createElement("ul");
       	  
      divrow.setAttribute("class", "row"); 	  
      divcol.setAttribute("class", "col-sm-8 col-sm-offset-2"); 	
      ul.setAttribute("id", "timeline-office-selector");
      ul.setAttribute("class", "timeline list");
	  
	  $(divrow).append(divcol);
	  $(divcol).append(ul);

      Categories.forEach(function(cat){
        var dt = {name : cat};
        $(ul).append(this.li(dt));
      }, this);
      this.el.appendChild(divrow);

    },

    //
    // [ DRAW GRAPH AXIS LABELS ]
    //
    //
    draw_labels : function(svg){

      svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("transform", "translate("+ Margins.numbers + ", " + Margins.height/2 + ")rotate(-90)")
        .text("Peticiones");

      svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("transform", "translate("+ Margins.width/2 + ", " + (Margins.height - Margins.dates) + ")")
        .text("Año");
    }
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return timeline;
});