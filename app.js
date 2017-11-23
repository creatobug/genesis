var express = require('express'),
routes = require('./routes'),
http = require('http'),
https = require('https'),
request = require('request'),
bodyParser = require('body-parser'),
router = express.Router();


var app = express();
var port = 3000;
var RestClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); 

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//Define routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

// app.listen(port);
var server = app.listen(port,function(){
console.log("Application connected on port "+port);
});

 
//Define controller dependencies here
require('./ApiRequests/loginCallout')(app);
require('./ApiRequests/retrieveCallout')(app);
require('./ApiRequests/updateJsonFile')(app);
require('./ApiRequests/deployCallout')(app);



// expose app           
exports = module.exports = app;


