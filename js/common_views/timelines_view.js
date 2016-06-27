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
      Color_r  = ["#225378","#3498DB", "#1695A3" , "#EB7F00", "#FF6138",  "#CE003C", "#79BD8F", "#00A388","#7E8AA2", "#2C3E50"],

  //
  // D E F I N E   C O N S T A N T 'S
  // --------------------------------------------------------------------------------
  //
  Format        = d3.format(","),
  Data          = null,
  First_time    = true,
  Categories    = [],
  Current_data  = null,
  Current_range = null,
  Margins       = {
    width    : 800,
    height   : 500,
    top      : 20,
    right    : 30,
    bottom   : 40, 
    left     : 70,
    numbers  : 10,
    dates    : 0,
    padding  : 0,
    oPadding : 15
  },
  Dot_style = {
    opacity : 0,
    cursor : "pointer"
  },
  DotHover_style = {
    opacity : 1,
    fill : "rgba(0,0,0,0.3)"
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S   A N D   T E M P L A T E S
  // --------------------------------------------------------------------------------
  //
  LI = "<li><a class='category-toggle' data-category='<%=name%>' href='#'><b style='background:<%=i%>'></b><%=name%></a></li>";
  
    
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
    initialize : function(settings){
      this.controller = settings.controller;
      this.svg        = new SVG(this.el, Margins);
      this.draw_labels(this.svg);
      this.first_time = true;
      this.dataURL    = settings.dataURL;
    },

    //
    // [ RENDER THE GRAPH ]
    //
    //
    render : function(data, range){
      Data  = data;
      var d = data;
      this.prepare_data(d);

      if(this.first_time){
        this.set_scales(d);
        this.set_axis();
        this.get_line_generator();
        this.draw_lines(d);
        this.draw_dots(d);
        this.draw_list();
        this.first_time = false;
      }
      else{
        this.update_render();
      }

      Current_range = range;
    },

    update_render : function(){
      // [1] generate the helpers again
      this.set_scales(Current_data);
      this.get_line_generator();
      this.set_axis(true);
      this.draw_lines(Current_data, true);
      this.remove_dots();
      this.draw_dots(Current_data);
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

      this.update_render();
    },

    //
    // [ PREPARE THE DATA FOR THE VERTICAL HOVER ]
    //
    //
    prepare_vertical_labels_data : function(){
    },

    get_range : function(){
      return Current_range;
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
        .transition().duration(500).ease("sin-in-out")
        .call(x_axis); 
        this.svg.select(".y_axis")
        .transition().duration(500).ease("sin-in-out")
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
    draw_lines : function(data, update){
      var that       = this,
          data_lines = [];
      Categories.forEach(function(cat, i){
        var m    = _.where(data, {dependencia : cat});
        data_lines.push(m);
      }, this);

      if(!update){
        var container = this.svg.append("g").attr("class", "main_container");
        this.lines = container.selectAll("path")
          .data(data_lines).enter()
            .append("path")
            .attr("d", this.line)
            .attr("id",  function (d, i) {
	          	return  "g-" + [i];    		    
            })
            .attr("fill", "none")
            .attr("stroke", function (d, i) {
	          	return  Color_r[i];    		    
            })
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.5);
      }
      else{
        this.lines.data(data_lines);
        this.lines.transition().duration(500).ease("sin-in-out").attr("d", this.line);
      }
/*
      this.lines.on("mouseover", function(d){
        that.draw_tooltips(d);
      })
      this.lines.on("mouseout", function(d){
        that.svg.selectAll(".amount").remove();
      });*/
      
    },

    //
    //
    //
    //
    draw_dots : function(data){
      var that = this;
      this.svg.selectAll(".dot").remove();
      this.svg.selectAll(".dot").data(data).enter()
        .append("circle")
          .attr("class", "dot")
          .attr("r", "4")
          .attr("cx", function(d){
            return that.scales[0](d.date);
          })
          .attr("cy", function(d){
            return that.scales[1](d.total);
          })
          .style(Dot_style)
          .on("mouseover", function(d){
            d3.select(this).style(DotHover_style);
            $('svg .main_container path').attr("class","path_out");
            Categories.forEach(function(cat, i){
	            if(cat == d.dependencia) {
				$('svg .main_container path#g-'+ [i]).attr("class","path_hover");
	            }
            });
          //  $(d.currentTarget).attr("class","path_hover");
            that.controller.create_tooltip({
              title   : d.dependencia,
              content : "Peticiones : <strong>" + Format(d.total) + "</strong> | Fecha : " + (d.date.getMonth()+1) + "/" + d.date.getFullYear()
            });
          })
          .on("mouseout", function(d){
            d3.select(this).style(Dot_style);
		  $('svg .main_container path').attr("class","");
            that.controller.remove_tooltip();
          })
    },

    remove_dots : function(){
      d3.selectAll(".dot").remove();
    },


    //
    //
    //
    //
    draw_vertical_labels : function(update){
      var data = this.prepare_vertical_labels_data();
      //this.svg.selectAll
    },

    //
    //
    //
    //
    draw_tooltips : function(data){
      var that   = this,
          labels = this.svg.selectAll(".amount").data(data).enter()
                     .append("g")
                       .attr("class", "amount")
                       .attr("transform", function(d){
                         var x   = that.scales[0](d.date),
                             y   = that.scales[1](d.total),
                             txt = "translate(" + x + ", " + y + ")"; 
                         return txt;
                       });
      labels.append("text").text(function(d){
        return Format(d.total);
      });
    },

    //
    // [ DRAW USERS LIST ]
    //
    //
    draw_list : function(){
      var divrow 	= document.createElement("div"),
      	  divcol 	= document.createElement("div"),
       	  ul  		= document.createElement("ul");
       	  
     divrow.setAttribute("class", "row"); 	  
      divcol.setAttribute("class", "col-sm-10 col-sm-offset-1"); 
      ul.setAttribute("id", "timeline-office-selector");
      ul.setAttribute("class", "row timeline list");
	  
	    $(divrow).append(divcol);
	    $(divcol).append(ul);

      Categories.forEach(function(cat, i){
        var dt = {name : cat, i : Color_r[i]};
        $(ul).append(this.li(dt));
      }, this);
      this.el.insertBefore(divrow, this.el.firstChild);
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