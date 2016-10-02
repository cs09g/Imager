// var express = require('express');
// var app = express();
// var fs = require('fs');
// var path = require('path');

// app.use('/static', express.static(__dirname + '/'));

// app.get('/', function (req, res) {
//   console.log(req.url);
//   fs.readFile(path.join(__dirname, '../html/imgrMain.html'), function(err, data){
//   	if(err){
//   		console.log(err);
//   	}
//   	else{
//   		res.writeHead(200, {'Content-Type': 'text/html'});
//   		res.end(data);
//   	}
//   });
// });

// app.listen(1337, function () {
//   console.log('Example app listening on port 1337!');
// });

var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  var contentType;
  var url = req.url;
  if (url === '/') {
    url = '/static/html/imgrMain.html';
  }

  if (url.indexOf('.html') != -1) {
    contentType = 'text/html';
  } else if (url.indexOf('.js') != -1) {
    contentType = 'text/javascript';
  } else {
    contentType = 'text/css';
  }

  fs.readFile(path.join(__dirname, '../..' + url), function(err, data){
    if(err){
      console.log(err);
    } else{
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  }); 

}).listen(1337, 'localhost');

console.log('Server running at http://127.0.0.1:1337/');








