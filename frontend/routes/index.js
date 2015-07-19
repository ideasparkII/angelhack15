var express = require('express');
var router = express.Router();

function avgSentiment(pos, neg) {
    var avg = [];
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
    var donald_trump = require('./scott.json');
    var jeb_bush = require('./scott.json');
    var hillary_clinton = require('./scott.json');
    var bernie_sanders = require('./scott.json');    
    
    var candidates = [
        {"name":"Donald Trump", "party":"Republican", "img": "donald_trump.jpg", "chartData": donald_trump.filter(function(el) {return el.candidate =="Donald Trump"})},
        {"name":"Jeb Bush", "party":"Republican", "img": "jeb_bush.jpg", "chartData": jeb_bush.filter(function(el) {return el.candidate =="Jeb Bush"})},        
        {"name":"Hillary Clinton", "party":"Democrat", "img": "hillary_clinton.jpg", "chartData": hillary_clinton.filter(function(el) {return el.candidate =="Hillary Clinton"})},
        {"name":"Bernie Sanders", "party":"Democrat", "img": "bernie_sanders.jpg", "chartData": bernie_sanders.filter(function(el) {return el.candidate =="Bernie Sanders"})}
    ];
   
    res.render('index', { candidates: candidates });
});

module.exports = router;
