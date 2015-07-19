/// <reference path="../../../typings/jquery/jquery.d.ts"/>

$(document).ready(function() {
  
  $('#select-candidate').change(function() {
    var activeCandidate = $('#select-candidate').val();
    setCandidateInfo(candidates[activeCandidate]);
  });
  
  $('.issue-icon').click(function() {
      $('.issue-icon').removeClass('active');
      $(this).addClass('active');
  })
  
  var setCandidateInfo = function(candidate) {
    $('h2').text(candidate.name + ' (' + candidate.party + ')');
    $('.candidate-portrait img').attr('src', 'images/portraits/' + candidate.img);
  }
  
  var makeLineChart = function(data) {
    var ctx = $("#myChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var options;
    var myNewChart = new Chart(ctx).Line(data, options);      
  };
  
  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '...',
      maxZoom: 18
    }
  );
  
  var cfg = {
    "radius": 0.5,
    "maxOpacity": .5, 
    "scaleRadius": true, 
    "useLocalExtrema": true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count',  
  };
  
  var negativeCfg = {
    "gradient": {
      '0': 'yellow',
      '1': 'red'
    }                    
  };

  var positiveCfg = {
    "gradient": {
      '0': 'yellow',
      '1': 'green'
    }                    
  };  
  
  $.extend(negativeCfg,cfg);
  $.extend(positiveCfg,cfg);
   
  var positiveSentimentLayer = new HeatmapOverlay(positiveCfg);
  var negativeSentimentLayer = new HeatmapOverlay(negativeCfg);  
  var map = new L.Map('map-canvas', {
    center: new L.LatLng(39.50, -98.35),
    zoom: 4,
    layers: [baseLayer, negativeSentimentLayer, positiveSentimentLayer]
  });
  
  positiveSentimentLayer.setData(positiveData);
  negativeSentimentLayer.setData(negativeData);  
  
  makeLineChart(data);

});