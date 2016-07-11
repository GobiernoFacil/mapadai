// BIG MAP APP
//
//
//

/*
 * [ V A R   D E F I N I T I O N ]
 * --------------------------------------------------------------------------------
 *
 *
 */

var appINAI = {
  _colorPanel : L.Control.extend({
    initialize : function(app, options){
      this.app = app;
      L.Util.setOptions(this, options);
    },
    onAdd : function(map){
      var div    = document.createElement("div"), // the info panel
          h3     = document.createElement("h3"),  // the title
          h4     = document.createElement("h4")   // the current value
          h5     = document.createElement("h5");  // the description
          colors = document.createElement("ul");  // the colors list

	  div.appendChild(h5);
      div.appendChild(colors);
      div.appendChild(h3);
      div.appendChild(h4);
     
      
      return div;
    }
  }),

  format : d3.format(","),
  // a dictionary for the valiable values. Is used to mix all the years of a given index,
  // tom make a single calculation for the data range (e.g. get the values from 2008 to 2014 to
  // define the color range)
  dataMap : {
 //   pob_conapo : [{key : "pob_conapo_2016", year : 2016, title : "población conapo"}],
   
    solicitudes : [
    {
      key  : "solicitudes_2014",
      year : 2014,
      title : "solicitudes"
    },
    {
      key  : "solicitudes_2013",
      year : 2013
    },
    {
      key  : "solicitudes_2012",
      year : 2012
    },
    {
      key  : "solicitudes_2011",
      year : 2011
    },
    {
      key  : "solicitudes_2010",
      year : 2010
    },
    {
      key  : "solicitudes_2009",
      year : 2009
    },
    {
      key  : "solicitudes_2008",
      year : 2008,
    },
    ],
    recursos : [
    {
      key  : "recurso_2014",
      year : 2014,
      title : "recursos"
    },
    {
      key  : "recurso_2013",
      year : 2013
    },
    {
      key  : "recurso_2012",
      year : 2012
    },
    {
      key  : "recurso_2011",
      year : 2011
    },
    {
      key  : "recurso_2010",
      year : 2010
    },
    {
      key  : "recurso_2009",
      year : 2009
    },
    {
      key  : "recurso_2008",
      year : 2008,
    },
    ],
    indice : [
    {
      key  : "indice_2014",
      year : 2014,
      title : "índice"
    },
    {
      key  : "indice_2013",
      year : 2013
    },
    {
      key  : "indice_2012",
      year : 2012
    },
    {
      key  : "indice_2011",
      year : 2011
    },
    {
      key  : "indice_2010",
      year : 2010
    },
    {
      key  : "indice_2009",
      year : 2009
    },
    {
      key  : "indice_2008",
      year : 2008
    },    
    ],
    presupuesto : [
    {
      key  : "presupuesto_2016",
      year : 2016,
      title : "presupuesto"
    },
    {
      key  : "presupuesto_2015",
      year : 2015
    },
    {
      key  : "presupuesto_2014",
      year : 2014
    },
    ],
    percapita : [{key : "percapita_2016", year : 2016, title : "percápita"}],
    "resolucion_sobreseer":[{key          : "resolucion_sobreseer", year : 2014, title : "resolución sobreseer"}],
   "resolucion_desechar":[{key            : "resolucion_desechar", year : 2014, title : "resolución desechar"}],
   "resolucion_revocar":[{key             : "resolucion_revocar", year : 2014, title : "resolución revocar"}],
   "resolucion_confirmar":[{key           : "resolucion_confirmar", year : 2014, title : "resolución confirmar"}],
   "resolucion_modificar":[{key           : "resolucion_modificar", year : 2014, title : "resolución modificar"}],
   "resolucion_tramite":[{key             : "resolucion_tramite", year : 2014, title : "resolución trámite"}],
   "resolucion_no_interpuesto":[{key      : "resolucion_no_interpuesto", year : 2014, title : "resolución no interpuesto"}],
   "resolucion_orden_entregar":[{key      : "resolucion_orden_entregar", year : 2014, title : "resolución orden entregar"}],
   "resolucion_revocar_parcial":[{key     : "resolucion_revocar_parcial", year : 2014, title : "resolución revocar parcial"}],
   "resolucion_revocados":[{key           : "resolucion_revocados", year : 2014, title : "resolución revocados"}],
   "resolucion_improcedente":[{key        : "resolucion_improcedente", year : 2014, title : "resolución improcedente"}],
   "resolucion_desechado":[{key           : "resolucion_desechado", year : 2014, title : "resolución desechado"}],
   "resolucion_confirmar_respuesta":[{key : "resolucion_confirmar_respuesta", year : 2014, title : "resolución confirmar respuesta"}]
  },

  // las opciones de color disponibles
  BREW_COLORS :["OrRd", "PuBu", "BuPu", "Oranges", 
    "BuGn", "YlOrBr", "YlGn", "Reds", 
    "RdPu", "Greens", "YlGnBu", "Purples", 
    "GnBu", "Greys", "YlOrRd", "PuRd", "Blues", 
    "PuBuGn", "Spectral", "RdYlGn", "RdBu", 
    "PiYG", "PRGn", "RdYlBu", "BrBG", 
    "RdGy", "PuOr", "Set2", "Accent", 
    "Set1", "Set3", "Dark2", "Paired", 
    "Pastel2", "Pastel1"],
  // los settings del mapa
  mapSettings : {
    div  : "map", // el id del div que contendrá el mapa
    lat  : 22.442167,
    lng  : -100.110350,
    zoom : 5,
    ///mapbox
	id      : 'mapbox.satellite',
	baseURL : 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=',
	token   : "pk.eyJ1IjoiaHVnb3ZvbSIsImEiOiIycUhyRXI0In0.HkorLQiks6oI85fhRwX2UQ",
	attribution_m : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	//openstreemap
	osmapURL: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  // el CSS para cada estado
  stateStyle : {
    weight      : 1,
    opacity     : 0.5,
    fillOpacity : 0.7,         
    color       : 'white',
  },

  stateHoverStyle : {
	opacity     : 0.8,  
    fillOpacity : 0.9,
  },
  // se inician variables internas
  map          : null, // el mapa de leaflet
  states       : null, // un array con los estados
  brew         : null, // el objeto de color
  index        : null, // el indicador seleccionado
  year         : null, // el año seleccionado
  // las opciones del objeto de color
  brewSettings : {
    colorNum : 6, // el número de colores
    colorKey : 2,///22,//17,// 12, // la clave de color (BREW_COLORS)
    classify : "jenks" // el método para hacer la separación de color. Sepa :P
  },
  states_array : [], // el array con objetos, datos y geometrías.
  
  //
  // [ La función de inicio ]
  //
  initialize : function(estados, inai, select, menu){
    // se obtiene una referencia al appINAI, para usarla dentro de las funciones de este método
    var that = this;
    this._select = select;
    this._menu = menu;
    // se crea el mapa de leaflet
    this.map = L.map(this.mapSettings.div).setView([
      this.mapSettings.lat, 
      this.mapSettings.lng
    ],this.mapSettings.zoom),
    /// O___o
    L.tileLayer(this.mapSettings.baseURL + this.mapSettings.token, { id : this.mapSettings.id, 
	    attribution: this.mapSettings.attribution_m}).addTo(that.map);

    
    


    // se carga el gejson de los estados
    d3.json(estados, function(error, json){
      // ya que cargó el geojson de los estados, configura algunas variables internas
      that.setStates(json);
      // se carga a hora la info del INAI
      d3.json(inai, function(error, _json){
        // cuando se tiene la info del INAI, se configuran otras variables internas
        that.mapData(_json);
        // se pinta de colores el mapa
        that.fillSelect();
        that.filterData(select);

        // genera el panel de información y lo pega al mapa
        that.panel = new that._colorPanel(that, { position : 'topright' });
        console.log(that.panel);
        that.panel.addTo(that.map);
      });
    });
  },

  // [ setStates --- COMENTAR DESPÚES ]
  //
  //
  setStates : function(estados){
    var that = this;
    this.states = L.geoJson(estados, {
      style         : this.stateStyle,
      onEachFeature : function(feature, layer) {
        that.states_array.push({
          id      : feature.properties.id,
          feature : feature,
          layer   : layer
        });

        layer.on({
          mouseover : function(){
            var stateName   = feature.properties.name,
                title       = that.panel._container.querySelector("h3"),
                current     = that.index.filter(function(d){
                  return that.year == d.year;
                })[0],
                val = feature.properties.data[current.key];

            that.updateInfoPanel();
            that.updateInfoPanelState(stateName, val);
            layer.setStyle(that.stateHoverStyle);
          },

          mouseout  : function(){
            var   title       = that.panel._container.querySelector("h3");
            
            layer.setStyle(that.stateStyle);
            title.innerHTML  = "";
          },
          //click     : this.zoomToFeature.bind(this)
        });
      },
    }).addTo(this.map);
  },

  // [ updateInfoPanel --- COMENTAR DESPÚES ]
  //
  //
  updateInfoPanel : function(){
    var that        = this,
        breaks      = this.brew.getBreaks(),
        colors      = this.brew.getColors(),
        desc        = this.index[0].title,
        colorsList  = this.panel._container.querySelector("ul"),
        description = this.panel._container.querySelector("h5");
    
    colorsList.innerHTML = "";
    colors.forEach(function(col, ind){
      var li     = document.createElement("li"),
          _color = document.createElement("span"),
          _label = document.createElement("span");

      _color.className = "color-label";
      _color.style.backgroundColor = col;
      _label.className = "num-label";
      _label.innerHTML = that.format(breaks[ind]) + " - <br>" + that.format(breaks[ind+1]);
      li.appendChild(_color);
      li.appendChild(_label);
      colorsList.appendChild(li);
    });
    description.innerHTML = desc;
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  updateInfoPanelState : function(name, val){
    var title = this.panel._container.querySelector("h3"),
        value = this.panel._container.querySelector("h4");
    
    title.innerHTML       = '<span>Entidad Federativa</span> ' + name + ': <strong> ' +  this.format(val) + '</strong>';
   // value.innerHTML       = this.format(val);
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  fillSelect : function(){
    for(var prop in this.dataMap){
      if( this.dataMap.hasOwnProperty( prop ) ) {
	   /*   switch (prop) {
		      case "solicitudes":
		      	prop = "Solicitudes de Información";
		      	break;
	      }*/
	      
        var opt = document.createElement("option");
        opt.innerHTML = prop;
        this._select.appendChild(opt);
      } 
    }
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  mapData : function(INAIdata){
    this.states_array = this.states_array.map(function(state){
      state.feature.properties.data = INAIdata.filter(function(data){
        return data.id == state.feature.properties.id;
      })[0];
      return state;
    });
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  filterData : function(e){
    var select = e.currentTarget || e,
        _index = select.value,
        index  = this.dataMap[_index],
        keys   = index.map(function(ind){
          return ind.key;
        }),
        years   = index.map(function(ind){
          return ind.year;
        }),
        data     = [],
        selected = keys[0];

        this.index = index;

        keys.forEach(function(k){
          data = data.concat(this.states_array.map(function(state){
            return +state.feature.properties.data[k] || 0;
          }));
        }, this);

    this.brewColor(data);
    this.updateMap(this.index[0].year);
    this.setYearSelector(years);
    if(this.panel){
      this.updateInfoPanel();
    }
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  updateMap : function(year){
    var current = this.index.filter(function(el){
          return el.year == year;
        }),
        selected = current[0].key;

    this.year = year;

    this.states_array.forEach(function(state){
      state.layer.setStyle({
        fillColor : this.brew.getColorInRange(+state.feature.properties.data[selected] || 0)
      });
    }, this);
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  setYearSelector : function(years){
    var that = this;
    this._menu.innerHTML = "";
    
    for(var i = 0; i < years.length; i++){
      var li     = document.createElement("li"),
          anchor = document.createElement("a"),
          year   = document.createTextNode(years[i]);
      anchor.appendChild(year);
      anchor.href = "#";
      anchor.setAttribute("data-year", years[i]);
      if (i == 0) {
	      anchor.className = "year current";
      }
      else {
	      anchor.className = "year";
      }
      li.appendChild(anchor);
      this._menu.appendChild(li);
    }
    d3.selectAll("a.year")
      .on("click", function(){
        d3.event.preventDefault();
		$("a.year").removeClass("current");
	    this.className = "year current";
        console.log(that.index);
        that.updateMap(this.getAttribute("data-year"));
      });
  },

  // [ COMENTAR DESPÚES ]
  //
  //
  brewColor : function(data){
    this.brew = new classyBrew();
    this.brew.setSeries(data);
    this.brew.setNumClasses(this.brewSettings.colorNum);
    this.brew.setColorCode(this.BREW_COLORS[this.brewSettings.colorKey]);
    this.brew.classify(this.brewSettings.classify);
  }
};

// INICIA EL MAPA
appINAI.initialize("js/json/estados.json", "js/json/inai-data.json", document.querySelector("select"), document.getElementById("year-selector"));

// ACTIVA EL SELECTOR DE VARIABLE
var selector = document.querySelector("select");
selector.addEventListener("change", function(e){
  appINAI.filterData(e);
});