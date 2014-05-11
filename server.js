var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var favicon = require('serve-favicon');
var path = require('path');

app.use(favicon(__dirname +'/client/img/FinViews.ico'));
app.set('views', __dirname+'/client/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'client')));

app.get("/", function (req, res) {
	res.render('index');	
});

app.listen(port, function () {
	console.log('Express Server listening on ' + port);
});