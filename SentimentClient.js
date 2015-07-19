var iod = require('iod-node');
client = new iod.IODClient('http://api.idolondemand.com','07a106d0-ff07-496b-a1b5-288b752da744');
var jsonArr  
//Reads file and returns JSON string of files contents
function ReadFile(filename){
	fs = require('fs');
	fs.readFile(filename, 'UTF8', function(err, contents){
		if(!err){
				console.log(typeof(contents));
				var x = JSON.parse(contents);
				console.log(x.id);
				AnalyzeSentiment(x.text)
				jsonArr = {
					numFollowers: x.user.followers_count,
					accCreationDate: x.user.created_at,
					truncatedTweet: x.truncated,
					numFavorited: x.favorite_count,
					numRetweets: x.retweet_count,
					language: x.lang
				};
			}
		else{
			console.log(err);
		}
	})
}
var callback = function(err, resp, body){
	//jsonArr = jsonArr+ JSON.stringify(body['aggregate'])
	jsonArr.sentiment = body['aggregate']
	console.log(jsonArr)
}
//Processes text and return JSON with sentiment value
function AnalyzeSentiment(arg1) {
	var data = {'text': arg1};
	client.call('analyzesentiment',callback, data, false );
}
//AnalyzeSentiment('Donald Trump is a prisoner of the war inside his own head')
ReadFile('sunjul1902-54-07+00002015.txt');
