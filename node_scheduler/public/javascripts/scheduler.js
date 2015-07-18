var schedule = require('node-schedule');

//recurrence scheduling

var base = new Date(2015, 7, 18, 12, 44, 20, 0);

function everySecond(test){
		var rule = new schedule.RecurrenceRule();
		rule.second = null;

		var j = schedule.scheduleJob(rule, function(){
			console.log("test");
		});

}

module.exports = everySecond;
}

