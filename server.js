var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var ejs = require('ejs-locals');
var bodyParser = require('body-parser');
var uglifyJS = require('uglify-js');

var result = uglifyJS.minify(path.join(__dirname, '/static/js/imgrMain.js'), {
	mangleProperties: {
		regex: /^_/
	}
});

fs.writeFile(path.join(__dirname, '/release/imgrMain.min.js'), result.code, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('minified code is created');
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/Bootstrap', express.static(path.join(__dirname, '/static/external/Bootstrap')));
app.use('/extern/js', express.static(path.join(__dirname, '/static/external/js')));
app.use('/js', express.static(path.join(__dirname, '/static/js')));
app.use('/release', express.static(path.join(__dirname, '/release')));

app.engine('ejs', ejs);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render(path.join(__dirname, '/static/layout/imgrMain'), {

	});
});

app.listen(1337, function () {
	console.log('Imager listening on port 1337!');
});






