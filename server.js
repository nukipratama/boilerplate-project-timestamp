// server.js
// where your node app starts
// init project
const moment = require('moment');
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
	optionsSuccessStatus: 200
})); // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});
// your first API endpoint... 
app.get("/api/hello", function(req, res) {
	res.json({
		greeting: 'hello API'
	});
});
app.get("/api/:dateTime?", (req, res) => {
	if(!req.params.dateTime) {
		var now = moment().utc();
		return res.json({
			unix: parseInt(now.format('x')),
			utc: now.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
		});
	}
	if(moment(req.params.dateTime, 'x', true).isValid()) {
		var unix = moment(parseInt(req.params.dateTime)).utc();
		return res.json({
			unix: parseInt(req.params.dateTime),
			utc: unix.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
		});
	}
	if(!moment(req.params.dateTime).isValid()) {
		return res.json({
			error: 'Invalid Date'
		});
	}
	var dateTime = moment(new Date(req.params.dateTime)).utc();
	return res.json({
		unix: parseInt(dateTime.format('x')),
		utc: dateTime.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
	});
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
	console.log('http://localhost:' + listener.address().port);
});