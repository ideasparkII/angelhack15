var gulp = require('gulp');
var twitter = require('twitter');
var schedule = require('node-schedule');
var Twitter = require('node-twitter')


gulp.task('default', scheduleSecond('P Square'));
gulp.task('fetchTwitter', fetchTwitter);

var tweetQueue = [];

//Scheduler that pulls from Twitter and uploads to s3 bucket every 1 second
function scheduleSecond(keyword){
	fetchTwitter(keyword);
	//Check for repeats
	var rule = new schedule.RecurrenceRule();
	rule.second = null;

	var j = schedule.scheduleJob(rule, function(){
		if(tweetQueue.length > 0){
			for(i = 0; i < tweetQueue.length; i++){
				console.log(tweetQueue[i]);
			}
			tweetQueue = [];
		}
	});
}

function fetchTwitter(keyword){
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
		// console.log(tweet.text);
		tweetQueue.push(tweet.screen_name + " " + tweet.text + " " + tweet.created_at);
	});
	t.start([keyword]);

}