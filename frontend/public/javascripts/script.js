/// <reference path="../../../typings/jquery/jquery.d.ts"/>

var testData2 = [
    {
        "Hillary Clinton": 0.5,
        "Donald Trump": -0.6,
        "Bernie Sanders": -0.3,
        "Jeb Bush": 0.5
    },
    {
        "Hillary Clinton": -0.8,
        "Donald Trump": 0.3,
        "Bernie Sanders": 0.2,
        "Jeb Bush": -0.5
    },
    {
        "Hillary Clinton": -0.1,
        "Donald Trump": 0.5,
        "Bernie Sanders": -0.5,
        "Jeb Bush": 0.5
    },
    {
        "Hillary Clinton": 0.9,
        "Donald Trump": -0.8,
        "Bernie Sanders": 0.5,
        "Jeb Bush": 0.5
    },
    {
        "Hillary Clinton": 0.2,
        "Donald Trump": -0.5,
        "Bernie Sanders": 0.5,
        "Jeb Bush": 0.5
    },
    {
        "Hillary Clinton": 0.2,
        "Donald Trump": -0.5,
        "Bernie Sanders": 0.4,
        "Jeb Bush": 0.3
    },
    {
        "Hillary Clinton": 0.25,
        "Donald Trump": -0.5,
        "Bernie Sanders": 0.2,
        "Jeb Bush": 0.9
    },                        
]

var testData = [
    {"date": "July 13",
     "candidate": "Hillary Clinton",
     "sentiment": -0.25
    },
    {"date": "July 14",
     "candidate": "Hillary Clinton",
     "sentiment": 0.5
    },
    {"date": "July 15",
     "candidate": "Hillary Clinton",
     "sentiment": 0.75
    },      
    {"date": "July 16",
     "candidate": "Hillary Clinton",
     "sentiment": 0.25
    },
    {"date": "July 17",
     "candidate": "Hillary Clinton",
     "sentiment": -0.5
    },
    {"date": "July 18",
     "candidate": "Hillary Clinton",
     "sentiment": 0.75
    },       
    {"date": "July 19",
     "candidate": "Hillary Clinton",
     "sentiment": -0.75
    },
    {"date": "July 13",
     "candidate": "Donald Trump",
     "sentiment": 0.25
    },
    {"date": "July 14",
     "candidate": "Donald Trump",
     "sentiment": -0.5
    },
    {"date": "July 15",
     "candidate": "Donald Trump",
     "sentiment": 0.75
    },      
    {"date": "July 16",
     "candidate": "Donald Trump",
     "sentiment": 0.25
    },
    {"date": "July 17",
     "candidate": "Donald Trump",
     "sentiment": -0.5
    },
    {"date": "July 18",
     "candidate": "Donald Trump",
     "sentiment": -0.75
    },       
    {"date": "July 19",
     "candidate": "Donald Trump",
     "sentiment": -0.75
    },
    {"date": "July 13",
     "candidate": "Bernie Sanders",
     "sentiment": -0.25
    },
    {"date": "July 14",
     "candidate": "Bernie Sanders",
     "sentiment": 0.5
    },
    {"date": "July 15",
     "candidate": "Bernie Sanders",
     "sentiment": 0.75
    },      
    {"date": "July 16",
     "candidate": "Bernie Sanders",
     "sentiment": 0.25
    },
    {"date": "July 17",
     "candidate": "Bernie Sanders",
     "sentiment": 0.5
    },
    {"date": "July 18",
     "candidate": "Bernie Sanders",
     "sentiment": -0.75
    },       
    {"date": "July 19",
     "candidate": "Bernie Sanders",
     "sentiment": -0.75
    },
    {"date": "July 13",
     "candidate": "Jeb Bush",
     "sentiment": -0.25
    },
    {"date": "July 14",
     "candidate": "Jeb Bush",
     "sentiment": 0.5
    },
    {"date": "July 15",
     "candidate": "Jeb Bush",
     "sentiment": -0.75
    },      
    {"date": "July 16",
     "candidate": "Jeb Bush",
     "sentiment": 0.25
    },
    {"date": "July 17",
     "candidate": "Jeb Bush",
     "sentiment": -0.5
    },
    {"date": "July 18",
     "candidate": "Jeb Bush",
     "sentiment": 0.70
    },       
    {"date": "July 19",
     "candidate": "Jeb Bush",
     "sentiment": -0.75
    }       
];

var positiveSentimentLayer;
var negativeSentimentLayer;


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
    
    makeLineChart(testData2, candidate.name);
        
    var mapData = generateSentimentMapData(candidate.chartData);

    positiveSentimentLayer.setData({'max': 1, 'data': mapData.positive});
    negativeSentimentLayer.setData({'max': 1, 'data': mapData.negative});      
  };
  
  var initMap = function() {
      var baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
          attribution: '...',
          maxZoom: 18
        }
      );
       
      var cfg = {
        "radius": 3.0,
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
       
      positiveSentimentLayer = new HeatmapOverlay(positiveCfg);
      negativeSentimentLayer = new HeatmapOverlay(negativeCfg);  
      var map = new L.Map('map-canvas', {
        center: new L.LatLng(39.50, -98.35),
        zoom: 4,
        layers: [baseLayer, negativeSentimentLayer, positiveSentimentLayer]
      });                   
  }
  
  var generateSentimentMapData = function(chartData) {
      var positiveSentimentData = [];
      var negativeSentimentData = [];
      for (var i=0; i<chartData.length; i++) {
          if (chartData[i].sentimentValue >= 0) {
            positiveSentimentData.push({
              lat: chartData[i].location.long,
              lng: chartData[i].location.lat,
              count: chartData[i].sentimentValue                
            });
          }
          else {
            negativeSentimentData.push({
              lat: chartData[i].location.long,
              lng: chartData[i].location.lat,
              count: chartData[i].sentimentValue * -1              
            });              
          }
          
      }

      return {"positive": positiveSentimentData, "negative": negativeSentimentData};
  };
  
  var makeLineChartCfg = function(averageSentiment, positiveSentiment, negativeSentiment){
    var lineChartCfg = {
        labels: ["July 13", "July 14", "July 15", "July 16", "July 17", "July 18", "July 19"],
        datasets: [
//            {
//                label: "Positive",
//                fillColor: "rgba(227,24,24,1)",
//                strokeColor: "rgba(227,24,24,1)",
//                pointColor: "rgba(227,24,24,1)",
//                pointDot: false,
//                pointDotRadius: 1,
//                pointStrokeColor: "#fff",
//                pointHighlightFill: "#fff",
//                pointHighlightStroke: "rgba(227,24,24,1)",
//                data: positiveSentiment
//            },
//            {
//                label: "Negative",
//                fillColor: "rgba(220,220,220,0.2)",
//                strokeColor: "rgba(220,220,220,1)",
//                pointColor: "rgba(220,220,220,1)",
//                pointDot: false,
//                pointDotRadius: 1,
//                pointStrokeColor: "#fff",
//                pointHighlightFill: "#fff",
//                pointHighlightStroke: "rgba(220,220,220,1)",
//                data: negativeSentiment
//            },
            {
                label: "Average",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointDot: false,
                pointDotRadius: 1,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: averageSentiment
            }                      
        ]
    };  
    
    return lineChartCfg;      
  }
  
  var makeLineChart = function(data, candidate) {
    
    var output = [];
    
    for (var i=0; i<data.length; i++) {
//        if (data[i].candidate === candidate) {
//            output.push(data[i].sentiment);
//        }
        output.push(data[i][candidate]);
    }  
      
    var processedData = makeLineChartCfg(output);
      
    var ctx = $("#myChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var options;
    var myNewChart = new Chart(ctx).Line(processedData, options);      
  };
    
    makeLineChart(testData, "Hillary Clinton");
    initMap(); 
    setCandidateInfo(candidates[0]);

});