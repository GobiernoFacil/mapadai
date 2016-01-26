// INAI - Diagnósitco MapaDAImx
// @package  : INAI
// @location : /js
// @file     : controller_usuarios.js
// @author   : Gobierno fácil <howdy@gobiernofacil.com>
// @url      : http://gobiernofacil.com

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  // --------------------------------------------------------------------------------
  //
  var Backbone   = require('backbone'),
      d3         = require("d3"),
     

  //
  // S E T U P   V A R S
  // --------------------------------------------------------------------------------
  //
  BASE_URL  = "http://inai.skalas.mx/api/usuarios/",
  Endpoints = ["edad", "sexo", "ocupacion", "sexo-edad"],
  URLS      = {
    age        : BASE_URL + Endpoints[0] + "?",
    gender     : BASE_URL + Endpoints[1] + "?",
    occupation : BASE_URL + Endpoints[2] + "?",
    ageGender : BASE_URL + Endpoints[3] + "?",
  },

  //
  // C A C H E   T H E   C O M M O N   E L E M E N T S
  // --------------------------------------------------------------------------------
  //
  Age        = document.querySelector("#users-by-gender"),
  Gender     = document.querySelector("#users-by-occupation"),
  Occupation = document.querySelector("#users-by-age"),
  AgeGender  = document.querySelector("#users-by-age-and-gender");
    
  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  var controller = Backbone.View.extend({
    
    //
    // [ DEFINE THE EVENTS ]
    //
    events :{
    },

    //
    // [ DEFINE THE TEMPLATES ]
    //


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

      // [2] create the graphs

      // [3] set the current graph and endpoint

      // [4] load the data
      this.age        = null,
      this.gender     = null,
      this.occupation = null,
      this.ageGender  = null;

      this.get_data([2004, 2015], "age", URLS.age);
      this.get_data([2004, 2015], "gender", URLS.gender);
      this.get_data([2004, 2015], "occupation", URLS.occupation);
      this.get_data([2004, 2015], "ageGender", URLS.ageGender);

    },
    
    get_data : function(range, graph, url){
      // [1] define the variables
      var endpoint, from, to, tbl, that = this;

      // [2] format the URL
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

      // [3] make the request
      d3.json(endpoint, function(error, json){
        if(error){
          // [3.1] fail x____x
          that.show_error(error);
        }
        else{
          // [3.2] make things sing!
          that[graph] = json;
        }
      });
    },

    //
    // [ ALERT THE USER IF THE API DOESN'T WORK ]
    //
    //
    show_error : function(error){
      alert("no se puede establecer conexión con el servidor");
    },

    
    //
    // L O C A L   T R A N S I T I O N S
    // --------------------------------------------------------------------------------
    //

  });

  //
  // R E T U R N   T H E   B A C K B O N E   " C O N T R O L L E R "
  // --------------------------------------------------------------------------------
  //
  return controller;
});