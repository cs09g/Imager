var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var ejs = require('ejs-locals');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/Bootstrap', express.static(path.join(__dirname, '/static/external/Bootstrap')));
app.use('/extern/js', express.static(path.join(__dirname, '/static/external/js')));
app.use('/js', express.static(path.join(__dirname, '/static/js')));

app.engine('ejs', ejs);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render(path.join(__dirname, '/static/layout/imgrMain'), {

	});
});

app.listen(1337, function () {
	console.log('Imager listening on port 1337!');
});






