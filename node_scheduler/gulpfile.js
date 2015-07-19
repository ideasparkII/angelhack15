var gulp = require('gulp');
var TwitterHistory = require('twitter');
var schedule = require('node-schedule');
var Twitter = require('node-twitter');
var AWS = require('aws-sdk');
var fs = require('fs');
var Twit = require('twit');
var wstream;
var keywords = [];
keywords.push('#jeb');
keywords.push('#clinton');
keywords.push('#trump');
keywords.push('#hilary');
keywords.push('#berniesanders');

var keywords2 = ['#jebbush',
    '#jeb!',
    '#jebbush',
    '#jeb2016',
    '#bush2016',
    '#jebforpresident',
    '#bencarson',
    'carson',
    'christie',
    '#christie2016',
    'cruz',
    '#tedcruz2016',
    '#cruz',
    '#cruz16',
    '#cruzcrew',
    '#carly2016',
    '#carlyfiorina',
    '#carlyforpresident',
    'fiorina',
    '#imwithmike',
    'huckabee',
    '#huckabee',
    '#bobbyjindal',
    '#bobbyforpresident',
    '#georgepataki',
    '#patakiforpresident',
    '#randpaul',
    '#paulforpresident',
    '#paul2016',
    '#standwithrand',
    '#rickperry',
    '#rickperry2016',
    '#perryforpresident',
    '#perrypresident',
    '#rubioforpresident',
    '#marcorubio2016',
    '#rubio2016',
    '#newamericancentury',
    '#teammarco',
    '#ricksantorum',
    '#santorum2016',
    '#trump',
    '#donald',
    'trump',
    '#trump2016',
    '#scottwalker',
    '#walker2016',
    'chaffee',
    '#lincolnchaffee',
    'clinton',
    '#hillaryclinton',
    '#hillaryforpresident',
    '#readyforhillary',
    '#hillary',
    '#hillary2016',
    '#hillaryforamerica',
    'omalley',
    '#omalley',
    '#sanders',
    'sanders',
    '#bernie',
    '#sandersforpresident',
    '#bernieforpresident',
    '#bernie2016',
    '#feelthebern',
    'webb',
    '#webbnation',
    '#webb2016'];

gulp.task('default', scheduleTweet(keywords));
gulp.task('fetchTwitter', fetchTwitter);

var tweetQueue = [];
var tweetHistory = [];
var keys = [];

/*fs.writeFile('keywords.txt', "", function(err){
	if(err) throw err;
	console.log("It's saved!");
})*/

//Scheduler that pulls from Twitter and uploads to s3 bucket every 1 second
function scheduleTweet(keywords){
/*	for(i = 0; i < keywords.length; i++){
		fs.appendFile('keywords.txt', keywords[i] + ",", function(err){
			if(err) throw err;
			console.log(keywords[i] + " was appended to the file!");
		})
	}
	fs.readFile("keywords.txt", "utf8", function(err, data){
		if(err){
			console.log(err);
		} 	
		content = data;
		processFile();
	})
	function processFile(){
		new_keywords = content.split(",")
		console.log(new_keywords)
		
	}*/
	//Check for repeats
	fetchTwitter(keywords);
	//Date must be 9 days ago
	//rule for intervals between posting

	var rule = new schedule.RecurrenceRule();
	rule.second = null;

	var mineRule = new schedule.RecurrenceRule();
	mineRule.second = 10;

	var newTweet = ""; 
	var oldTweet = "";

	var j = schedule.scheduleJob(rule, function(){
		if(tweetQueue.length > 0){
			for(i = 0; i < tweetQueue.length; i++){
				//Upload everything in the queue and clear the queue
				var s3 = new AWS.S3({params:{Bucket:'two-cense-twitter-data-raw', ACL:'authenticated-read', Key: tweetQueue[i].created_at.split(" ").join("")
					.toLowerCase()  + ".txt"}});
				newTweet = tweetQueue[i].created_at.split(" ").join("")
					.toLowerCase();
				s3.putObject({Body:JSON.stringify(tweetQueue[i])}, function(err, data){
					if(err){
						console.log("Error uploading data: ",err);
					} else {
						console.log("upload successful!");
					}
				});
			}
			tweetQueue = [];
		} 
	}); 
	var d = schedule.scheduleJob(mineRule, function(){
		fetchDate(keywords, '2015-7-10'); //Possibilities for future featers: add a get current date for 'end date'
		console.log("Data mined!");
	});
}

function fetchTwitter(keywords){
	t = new Twitter.StreamClient(
		'OP2irYRbaRrryFAN0l69RhHie',
		'BGkgLHRLjJh8ocRiDvG9GRq9srgoJpFiUqrtWg7oFDz6VSnkLT',
		'3283030910-u8i3UQaJM5LmD4y4FPvc4M2R0X4L0izCMEsIh1W',
		'0v8qCUs6E1B26btWamXum2qNpERfvayaOAAQ0hiN3R6zT'
	)

	t.on('close', function(){
		console.log('Conncetion closed');
	});
	t.on('end', function(){
		console.log('end of line');
	});
	t.on('error', function(error) {
	    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
	});
	t.on('tweet', function(tweet){
		console.log(tweet.text);
		// tweetQueue.push(tweet.retweeted + " " + tweet.text + " " + tweet.created_at);
		tweetQueue.push(tweet);
	});
	t.start(keywords);

}

function fetchDate(keywords, start){
	var i = 0;
	var t = new Twit({
		consumer_key:'OP2irYRbaRrryFAN0l69RhHie',
		consumer_secret: 'BGkgLHRLjJh8ocRiDvG9GRq9srgoJpFiUqrtWg7oFDz6VSnkLT',
		access_token:'3283030910-u8i3UQaJM5LmD4y4FPvc4M2R0X4L0izCMEsIh1W',
		access_token_secret: '0v8qCUs6E1B26btWamXum2qNpERfvayaOAAQ0hiN3R6zT'
	});
	console.log(keywords2.join(', '));
	t.get('search/tweets', {q: keywords2.join(', ').substring(0, keywords.length - 2) + ' since:' + start, count:1000}, function(err, data, response){
			if(data.statuses.length > 0){
				for(i = 0; i< data.statuses.length; i++){
					console.log(data.statuses[i].text);
					tweetHistory.push(data.statuses[i]);
					var s3 = new AWS.S3({params: {Bucket: 'two-cense-twitter-data-mined', ACL: 'authenticated-read', Key: tweetHistory[i].created_at.split(" ").join("")
						.toLowerCase() + ".txt"}});
					oldTweet = tweetHistory[i].created_at.split(" ").join("")
						.toLowerCase()
					s3.putObject({Body: JSON.stringify(data.statuses[i])}, function(err, data){
						if(err){
							console.log("Error uploading data: ", err);
						}	
					});
				}
			}
			else {
				console.log("tweet not found, please make sure your search is at most 9 days before current date");
			}
	});

}

	