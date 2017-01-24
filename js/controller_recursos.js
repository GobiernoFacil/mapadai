// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js
// @file     : controller_infomex.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // E N D P O I N T S   L I S T
  // --------------------------------------------------------------------------------
  //
  // api/heatmap
  // api/treemap
  // api/top10
  // api/top10line
  // api/usuarios/ocupacion
  // api/usuarios/edad
  // api/usuarios/sexo
  // api/usuarios/sexo-edad
  //


  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone   = require('backbone'),
      d3         = require("d3"),
      noUiSlider = require("nouislider"),
      //HeatMap    = require("common_views/heat_map_view"),
      Top10bar   = require("common_views/top10chart_view"),
      MultiBar   = require("common_views/multicolor_chart_view"),
      MultiBarB  = require("common_views/multicolor_chart_b_view"),
      Timeline   = require("common_views/timelines_view"), 
      TimelineC  = require("common_views/timelines_c_view"), 
      TreeMapB   = require("common_views/treemap_b_view"),
      Occupation = require("common_views/occupation_chart_view"),
      Gender     = require("common_views/gender_chart_view"),
      Tooltip    = require("text!templates/tooltip-a.html"),

  //
  // S E T U P   V A R S
  // --------------------------------------------------------------------------------
  //
  First_year = 2007,
  Last_year  = 2015,
  BASE_URL   = "http://inai.skalas.mx/api/rr/",
  Endpoints  = ["total", "sujetoObligado", "top10", "top10-total", "comisionado", "sexo-edad", "ocupacion"],
  
  URLS       = {
    solicitudes    : BASE_URL + Endpoints[0] + "?", // Recursos de revisión por solicitudes de información: 2012 - 2015
    sujetoObligado : BASE_URL + Endpoints[1] + "?", // Volumen de recursos de revisión, por sujeto obligado y por sentido de la resolución: 2012 - 2015
    top10Historico : BASE_URL + Endpoints[2] + "?", // Top 10 de sujetos obligados por recursos de revisión: 2013 - 2015 (histórico)
    top10Total     : BASE_URL + Endpoints[3] + "?", // Top 10 de sujetos obligados por recursos de revisión: 2013 - 2015 (total)
    comisionados   : BASE_URL + Endpoints[4] + "?", // Recursos por comisionado y sentido de la resolución: 2013 - 2015
    gender         : BASE_URL + Endpoints[5] + "?",
    occupation     : BASE_URL + Endpoints[6] + "?" // multicolor medio entrega
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //

  Slider = document.getElementById('slider');
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
      // new top nav
      "click #viz_nav a"    : "doit",
      
      /// sub_nav
      "click .sub_nav a"    : "dothat",
    
      // dataviz
      'mouseenter svg .main_container path' : 'hover_path',
      'mouseleave svg .main_container path' : 'leave_path',
    },

    //
    // [ DEFINE THE TEMPLATES ]
    //
    tooltip : _.template(Tooltip), 

    //
    // [ SET THE CONTAINER ]
    //
    //
    el : 'body',

    //
    // [ THE INITIALIZE FUNCTION ]
    //
    //
    initialize : function(){
      // [1] hide the UI stuff
      this.hide_stuff();

      // [2] setup the SLIDER
      this.slider = this.setup_slider(First_year, 3, Last_year);
      var time    = this.slider.noUiSlider.get();
      time[0]     = +time[0];
      time[1]     = +time[1];

      // [3] create the graphs
      //this.heatmap_a  = new HeatMap({controller  : this, el : "#heatmap-a"});
      //this.top10bars   = new Top10bar({controller : this, el : "#top10bar", dataURL : URLS.top10bars});
      ////////this.colorBar_a  = new MultiBar({controller : this, el : "#top10bar_b", dataURL : URLS.medios});
      //this.colorBar_b  = new MultiBar({controller : this, el : "#top10bar_b", dataURL : URLS.respuesta, type : "respuesta"});
      this.requests  = new TimelineC({controller : this, el : "#rr_total", dataURL : URLS.solicitudes});
      this.sujeto    = new TreeMapB({controller : this, el : "#treemap-a", dataURL : URLS.sujetoObligado});

      this.timeline  = new Timeline({controller : this, el : "#timeline-a", dataURL : URLS.top10Historico});
      //this.treemap_a   = new TreeMap({controller  : this, el : "#treemap-a", dataURL : URLS.treemap});
      //this.treemap_b   = new TreeMap({controller  : this, el : "#treemap-b", dataURL : URLS.respuesta, type : "tipo_sujeto"});
      this.occupation  = new Occupation({controller : this, el : "#occupation-bar", dataURL : URLS.occupation});
      this.gender      = new Gender({controller : this, el : "#gender-bar", dataURL : URLS.gender});
      //this.occupation  = new Timeline({controller : this, el : "#timeline-b", dataURL : URLS.timeline});

      this.graphsCollection = [this.requests, this.sujeto, /*this.top10bars, this.treemap_a,*/ this.occupation, 
                               this.gender, /*this.colorBar_b,*/ this.timeline];
      // [4] set the current graph and endpoint
      this.current_graph = this.requests;
      this.current_url   = URLS.solicitudes;

      // [5] load the data
      //this.get_data(time, this.heatmap_a, URLS.heatmap);
      //this.get_data(time, this.top10bars, URLS.top10bars);
      ////////this.get_data(time, this.colorBar_a, URLS.medios);
      //this.get_data(time, this.colorBar_b, URLS.respuesta);
      //this.get_data(time, this.treemap_a, URLS.treemap);
      //this.get_data(time, this.treemap_b, URLS.respuesta);
      this.get_data(time, this.requests, URLS.solicitudes);
      this.get_data(time, this.sujeto, URLS.sujetoObligado);

      this.get_data(time, this.occupation, URLS.occupation);
      this.get_data(time, this.gender, URLS.gender);
      //this.get_data(time, this.top10bars_b, URLS.top10bars);

      this.get_data(time, this.timeline, URLS.top10Historico);



      
      // [6] add a listener for the scroll, the ugly hack way
      this.year_menu = $.proxy(this.year_menu, this);
      this.setupScrollEvents = $.proxy(this.setupScrollEvents, this);
      this.fullExperiencieMobile = $.proxy(this.fullExperiencieMobile, this);
      
      window.onscroll   = this.year_menu;
      
      
    },

    //
    // [ RENDER THE CURRENT GRAPH ]
    //
    //
    get_data : function(range, graph, url){
      var endpoint, from, to, that = this;
      if(range.length === 1){
        from     = "from=" + parseInt(range[0]) + "-01-01";
        to       = "to="   + parseInt(range[0]) + "-12-31";
        endpoint = url + from + "&" + to;
      }
      else{
        from     = "from=" + parseInt(range[0]) + "-01-01";
        to       = "to="   + (parseInt(range[1])-1) + "-12-31";
        endpoint = url + from + "&" + to;
      }

      d3.json(endpoint, function(error, json){
        if(error){
          that.show_error(error);
        }
        else{
          graph.render(json, range); 
        }
      });
    },

    //
    // [ SETUP THE SLIDER ]
    //
    //
    setup_slider : function(first_year, years_to_last, last_year){
      // setup variables
      var that   = this,
          slider = Slider,
          now    = new Date(last_year+1, 0, 1),
          years  = now.getFullYear() - first_year,
          range  = {}; 

      // make range obj
      for(var i = 0; i <= years; i++){
        if(i == 0){
          range['min'] = first_year;
        }
        else if(i == years){
          range['max'] = now.getFullYear();
        }
        else{
          range[((100/years)*i).toString()] = first_year + i;
        }
      }

      // make the slider
      noUiSlider.create(slider, {
        start: [first_year, now.getFullYear()],
        step : 1,
        connect: true,
        //snap : true,
        // behaviour: 'tap',
        margin : 1,
        range: {
          min : first_year,
          max : now.getFullYear()
        },//range,
        pips : {
          mode : "values",
          values : d3.range(first_year, now.getFullYear() + 1, 1),
          density : 12,
          stepped : true
        }
      });
      slider.noUiSlider.set([now.getFullYear() - years_to_last, now.getFullYear()]);
      slider.noUiSlider.on("end", function(){

        that.get_data(this.get(), that.current_graph, that.current_url);
      });

      return slider;
    },

    //
    // UPDATE TIME UI
    //
    //
    update_time_ui : function(r){
      this.$(".year-range").html((+r[0]) + " - " + (+r[1]));
      this.slider.noUiSlider.set(r);
    },

    //
    // [ ALERT THE USER IF THE API DOESN'T WORK ]
    //
    //
    show_error : function(error){
      alert("no se puede establecer conexión con el servidor");
    },

    //
    // [ SHOW THE TOOLTIP ]
    //
    //
    create_tooltip : function(data){
      var el = $(this.tooltip(data));
      el.css({
        left : d3.event.pageX + "px",
        top  : d3.event.pageY + "px",
        position: "absolute"
      });

      this.$el.append(el);
    },

    //
    // [ BYE TOOLTIP! ]
    //
    //
    remove_tooltip : function(){
      $(".tooltip-container").remove();
    },
  
  
    // ----------------------
    // FIXED YEAR MENU
    // ----------------------
    //
    year_menu : function(e){
      if($(window).scrollTop() > 155){
      $('header').addClass('fixed_header');
      $('.nav-side').addClass('fixed_nav');
        $('.infomex_menu').addClass('fix-year');
        $('.section_name').removeClass('hide');
      }
      else{
      $('header').removeClass('fixed_header');
      $('.nav-side').removeClass('fixed_nav');
        $('.infomex_menu').removeClass('fix-year');
        $('.section_name').addClass('hide');
      }
    },
    
    // -----------------
    // ROLLOVER SVG PATH 
    // -----------------
    //
    hover_path : function(e) { 
      $('svg .main_container path').attr("class","path_out");
      $(e.currentTarget).attr("class","path_hover");
    },
  
    // -----------------
    // ROLLOUT SVG PATH 
    // -----------------
    //
    leave_path : function(e) { 
      $('svg .main_container path').attr("class","");
      $(e.currentTarget).attr("class","");
    },
    
    //
    // L O C A L   T R A N S I T I O N S
    // --------------------------------------------------------------------------------
    //
    hide_stuff : function(){

    },
    
    doit : function(e){
      e.preventDefault();
      var name_container = e.target.getAttribute("data-container"),
          container      = document.getElementById(name_container),
          vizAnchor      = container.querySelector(".col-sm-12 .viz"),
          vizName        = vizAnchor.getAttribute("data-graph"); 

      this.updateCurrentGraph(vizName);
      
      ///show/hide container tab 
      $(".content-tab").addClass("hide");
      $("#" +  name_container).removeClass("hide");

      $(".viz").addClass("hide");     
      $("#" + name_container).find(".col-sm-12 .viz").filter(":first").removeClass("hide");
      
      ///add class to current subtab
      $(".sub_nav a").removeClass("current");
      $("#" + name_container).find(".sub_nav li a").filter(":first").addClass("current");
      
      ///add class to current tab
     $("#viz_nav a").removeClass("current");
     $(e.target).addClass('current');
    },
    
    dothat : function(e) {
      e.preventDefault();
      //var name_container  = $(e.target).data('container'),
      var name_container = e.target.getAttribute("data-container");
         var vizType        = document.getElementById(name_container);
         console.log(name_container, vizType);
          var vizName        = vizType.getAttribute("data-graph");
      
      this.updateCurrentGraph(vizName);
      //show/hide container  
      $(".viz").addClass("hide");
      $("#" +  name_container).removeClass("hide");
      
      //add class to current tab
      $(".sub_nav a").removeClass("current");
      $(e.target).addClass('current');
    },
    
    updateCurrentGraph : function(viz){
      //return;
      console.log(viz);
      var g = this.graphsCollection.filter(function(graph){
        console.log(graph);
        return graph.el.id == viz;
      });

      if(g.length){
        this.current_graph = g[0]; 
        this.current_url   = g[0].dataURL;
        this.update_time_ui(this.current_graph.get_range());
      }
    }
    
  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});