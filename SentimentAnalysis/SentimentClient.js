var iod = require('iod-node');
var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});

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
exports.handler = function(event, context) {
	//ReadFile(event.Records.s3.object.key);
	var bucket = event.Records[0].s3.bucket.name;
	var key = event.Records[0].s3.object.key;
	console.log('The Key is '+key)
	s3.getObject({Bucket: bucket, Key:key}, function(err, data) {
		if(!err) {
			ReadFile(data);
			context.succeed();
		}
		else{
			console.log("Error getting object " + key + " from bucket " + bucket + ". Make sure they exist and your bucket is in the same region as this function.");
			context.fail("Error getting file: " + err);
		}
	});
}
