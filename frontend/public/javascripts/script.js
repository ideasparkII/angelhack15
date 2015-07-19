/// <reference path="../../../typings/jquery/jquery.d.ts"/>

$(document).ready(function() {
  
  var makeLineChart = function(data) {
    var ctx = $("#myChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var options;
    var myNewChart = new Chart(ctx).Line(data, options);      
  };
  
  var positiveData = {
    max: 1,
    data: [{lat: 41.5000, lng:-98.34, count: 0.5},
           {lat: 39.5000, lng:-98.34, count: 0.5},
           {lat: 40.5000, lng:-98.34, count: 0.5},
           {lat: 38.5000, lng:-98.34, count: 0.5},
           {lat: 37.5000, lng:-98.34, count: 0.25},
           {lat: 36.5000, lng:-98.34, count: 0.5},
           {lat: 35.5000, lng:-98.34, count: 0.5},
           {lat: 34.5000, lng:-98.34, count: 0.25},
           ]
  };
  
  var negativeData = {
     max: 1,
     data: [{lat: 41.5000, lng:-98.54, count: 0.5},
           {lat: 39.5000, lng:-98.54, count: 0.5},
           {lat: 40.5000, lng:-98.54, count: 0.5},
           {lat: 38.5000, lng:-98.54, count: 0.5},
           {lat: 37.5000, lng:-98.54, count: 1.0},
           {lat: 36.5000, lng:-98.54, count: 0.5},
           {lat: 35.5000, lng:-98.54, count: 0.5},
           {lat: 34.5000, lng:-98.54, count: 0.25},
           ]   
  }
  
  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '...',
      maxZoom: 18
    }
  );
  
  var positiveCfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 0.5,
    "maxOpacity": .5, 
    // scales the radius based on map zoom
    "scaleRadius": true, 
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries 
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count',
    "gradient": {
      '0': 'yellow',
      '1': 'green'
    }
  };
  
   var negativeCfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 0.5,
    "maxOpacity": .5, 
    // scales the radius based on map zoom
    "scaleRadius": true, 
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries 
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count',
    "gradient": {
      '0': 'yellow',
      '1': 'red'
    }
  }; 
  
  var positiveSentimentLayer = new HeatmapOverlay(positiveCfg);
  var negativeSentimentLayer = new HeatmapOverlay(negativeCfg);  
  var map = new L.Map('map-canvas', {
    center: new L.LatLng(39.50, -98.35),
    zoom: 3,
    layers: [baseLayer, negativeSentimentLayer, positiveSentimentLayer]
  });
  
  positiveSentimentLayer.setData(positiveData);
  negativeSentimentLayer.setData(negativeData);  
  
  makeLineChart(data);

});