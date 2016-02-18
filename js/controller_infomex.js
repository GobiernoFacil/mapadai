// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js
// @file     : controller_infomex.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone   = require('backbone'),
      d3         = require("d3"),
      noUiSlider = require("nouislider"),
      //HeatMap    = require("common_views/heat_map_view"),
      Top10bar   = require("common_views/top10chart_view"),
      Timeline   = require("common_views/timelines_view"), 
      TreeMap    = require("common_views/treemap_view"),
      Occupation = require("common_views/occupation_chart_view"),
      Gender     = require("common_views/gender_chart_view"),
      Tooltip    = require("text!templates/tooltip-a.html"),

  //
  // S E T U P   V A R S
  // --------------------------------------------------------------------------------
  //
  First_year = 2003,
  BASE_URL   = "http://inai.skalas.mx/api/",
  Endpoints  = ["heatmap", "treemap", "top10line", "top10", "usuarios/ocupacion", "usuarios/sexo-edad"],
  Table      = "table=conteo_infomex_publico&", 
  RR         = "rr=2&",
  URLS       = {
    //heatmap   : BASE_URL + Endpoints[0] + "?" + Table,
    treemap   : BASE_URL + Endpoints[1] + "?" + RR,
    timeline  : BASE_URL + Endpoints[2] + "?",
    top10bars : BASE_URL + Endpoints[3] + "?",
    occupation: BASE_URL + Endpoints[4] + "?",
    gender    : BASE_URL + Endpoints[5] + "?"
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  obligeeContainer  	 = document.querySelector("#obligee"),
  t_responseContainer	 = document.querySelector("#t_response"),
  applicantContainer	 = document.querySelector("#applicant_profile"),

  /// 
  timeContainer  	    = document.querySelector("#time"),
  topContainer   	    = document.querySelector("#top"),
  treemapContainer    = document.querySelector("#treemap"),
  //heatmapContainer    = document.querySelector("#heatmap"),
  occupationContainer = document.querySelector("#occupation"),
  Slider              = document.getElementById('slider');
  	
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
		 /// new top nav
	    "click #viz_nav a"		: "doit",
	    
	    /// sub_nav
	    "click .sub_nav a"		: "dothat",
		
		/// dataviz
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
      this.slider = this.setup_slider(First_year, 3);
      var time = this.slider.noUiSlider.get();
      time[0] = +time[0];
      time[1] = +time[1];

      // [3] create the graphs
      //this.heatmap_a  = new HeatMap({controller  : this, el : "#heatmap-a"});
      this.top10bars  = new Top10bar({controller : this, el : "#top10bar"});
      this.timeline_a = new Timeline({controller : this, el : "#timeline-a"});
      this.treemap_a  = new TreeMap({controller  : this, el : "#treemap-a"});
      this.occupation = new Occupation({controller : this, el : "#occupation-bar"});
      this.gender     = new Gender({controller : this, el : "#gender-bar"});
      this.xxx = new Timeline({controller : this, el : "#timeline-b"});

      // [4] set the current graph and endpoint
      this.current_graph = this.timeline_a;
      this.current_url   = URLS.timeline;

      // [5] load the data
      //this.get_data(time, this.heatmap_a, URLS.heatmap);
      this.get_data(time, this.top10bars, URLS.top10bars);
      this.get_data(time, this.timeline_a, URLS.timeline);
      this.get_data(time, this.treemap_a, URLS.treemap);
      this.get_data(time, this.occupation, URLS.occupation);
      this.get_data(time, this.gender, URLS.gender);

      this.get_data(time, this.xxx, URLS.timeline);



      
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
        to       = "to="   + parseInt(range[1]) + "-12-31";
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
    setup_slider : function(first_year, years_to_last){
      var that   = this,
          slider = Slider,
          now    = new Date();
      
      noUiSlider.create(slider, {
        start: [first_year, now.getFullYear()],
        step : 1,
        connect: true,
        // behaviour: 'tap',
        range: {
          'min': first_year,
          'max': now.getFullYear()
        },
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
	    var name_container = $(e.target).data('container');
	    
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
	    var name_container  = $(e.target).data('container'),
	    	viz_type		= $("#" + name_container).data('viz'),
	    	viz_url			= "";
	   
		switch (viz_type) {
			case "timeline":
				var viz_type = this.current_graph = this.timeline_a; 
				var viz_url  = URLS.timeline;
				var time_ui  = this.timeline_a.get_range();
			
			case "bar":
				var viz_type = this.current_graph = this.top10bars; 
				var viz_url  = URLS.top10bars;
				var time_ui  = this.top10bars.get_range();
				break;

			case "heatmap":
				var viz_type = this.current_graph = this.heatmap_a; 
				var viz_url  = URLS.heatmap;
				var time_ui  = this.heatmap_a.get_range();
				break;
			case "treemap":
				var viz_type = this.current_graph = this.treemap_a; 
				var viz_url  = URLS.treemap;
				var time_ui  = this.treemap_a.get_range();
				break;
			
			case "gender-bar":
				var viz_type = this.current_graph = this.gender; 
				var viz_url  = URLS.gender;
				var time_ui  = this.gender.get_range();
				break;
					
			case "occupation-bar":
				var viz_type = this.current_graph = this.occupation; 
				var viz_url  = URLS.occupation;
				var time_ui  = this.occupation.get_range();
				break;
		}
		
		this.current_graph = viz_type;
		this.current_url   = viz_url;
	   
		///show/hide container  
	    $(".viz").addClass("hide");
	    $("#" +  name_container).removeClass("hide");
	    
		///add class to current tab
		$(".sub_nav a").removeClass("current");
		$(e.target).addClass('current');
		
		this.update_time_ui(time_ui);
    },



  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});