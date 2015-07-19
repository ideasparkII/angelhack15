var express = require('express');
var router = express.Router();

function avgSentiment(pos, neg) {
    var avg = []
    for(var i=0; i<pos.length; i++) {
        avg[i] = (pos[i] + neg[i]) / 2;
    }
    
    return avg;
}

var posSentiment = [1, 0.75, 0.25, 1, 0, 0.25, 0.5];
var negSentiment = [-0.75, -1, -1, -0.25, 0, -0.25, -0.5];
var sentiment = avgSentiment(posSentiment, negSentiment);

/* GET home page. */
router.get('/', function(req, res, next) {
    var candidates = [
        {"name":"Donald Trump", "party":"Republican", "img": "donald_trump.jpg"},
        {"name":"Hillary Clinton", "party":"Democrat", "img": "hillary_clinton.jpg"},
        {"name":"Bernie Sanders", "party":"Democrat", "img": "bernie_sanders.jpg"},
    ];

      var positiveData = {
        max: 1,
        data: [{lat: 42.5000, lng:-98.34, count: 0.0},
               {lat: 39.5000, lng:-98.34, count: 0.0},
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
         data: [{lat: 41.5000, lng:-98.54, count: 0.0},
               {lat: 39.5000, lng:-98.54, count: 0.0},
               {lat: 40.5000, lng:-98.54, count: 0.5},
               {lat: 38.5000, lng:-98.54, count: 0.5},
               {lat: 37.5000, lng:-98.54, count: 1.0},
               {lat: 36.5000, lng:-98.54, count: 0.5},
               {lat: 35.5000, lng:-98.54, count: 0.5},
               {lat: 34.5000, lng:-98.54, count: 0.25},
               ]   
      }    
    
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Positive",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointDot: false,
                pointDotRadius: 1,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: posSentiment
            },
            {
                label: "Negative",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointDot: false,
                pointDotRadius: 1,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: negSentiment
            },
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
                data: sentiment
            }                      
        ]
    };
      
  res.render('index', { title: 'TwoCense', data: data, candidates: candidates, positiveData: positiveData, negativeData: negativeData});
});

module.exports = router;
