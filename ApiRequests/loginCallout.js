var FuelRest = require('fuel-rest');
var FuelAuth = require( 'fuel-auth' );
module.exports = function(app) {

app.post('/loginservice', function (req, res) {
	
		console.log('Hello there mate!');
		
		// console.log('req'+req);
		console.log('req'+req.body.clientId);
		console.log('req'+req.body.clientSecret);
		var authUrl = "https://auth.exacttargetapis.com/v1/requestToken"; //URI for request token
		
		//Decleare the Rest Client with the clientid and clientpassword ( This will be used in subsequest callouts)
		var options  = {
		    auth: {
		        // options you want passed when Fuel Auth is initialized
		        clientId:req.body.clientId,
		        clientSecret: req.body.clientSecret,
		        authUrl: authUrl
		    },
		    origin: 'https://www.exacttargetapis.com' // default --> https://www.exacttargetapis.com
		};  
		RestClient = new FuelRest(options);

		var options1 = {
  // whatever request options you want
  // See https://github.com/mikeal/request#requestoptions-callback
  
  force: true // I want to force a request
};
		// var RestClient = new FuelRest(options);
		// console.log('req'+options);
		//console.log('req'+FuelAuthClient.clientId);
		//FuelAuthClient.clientId = req.query.clientid;
		//FuelAuthClient.clientSecret = req.query.clientsecret;

		var FuelAuthClient = new FuelAuth({
			clientId: req.body.clientId // required
			, clientSecret: req.body.clientSecret // required
		});
		
		FuelAuthClient.getAccessToken(options1, function(err, data) {
		  if(err) {
			console.log(err);
			return;
		  }

		  // data.accessToken = your token
		  // data.expiresIn = how long until token expiration
		  console.log("data ", data);
		  var accessToken = data.accessToken;
		  res.send(data.accessToken);
		});
		
		
		/*
		console.log("response", res.body);
		res.writehead(200,{'Content-Type': 'text/plain'});
		res.write('Hello world 1');
		res.end();*/
});
}