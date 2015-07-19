var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var candidates = [
        {"name":"Lincoln Chafee", "party":"Democrat"},
        {"name":"Hillary Clinton", "party":"Democrat"},
        {"name":"Martin O'Malley", "party":"Democrat"},
        {"name":"Bernie Sanders", "party":"Democrat"},
        {"name":"Jim Webb", "party":"Democrat"}
    ];
    
    
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
      
  res.render('index', { title: 'TwoCense', data: data, candidates: candidates});
});

module.exports = router;
