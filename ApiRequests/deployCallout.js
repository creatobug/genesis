var FuelRest = require('fuel-rest');
var FuelAuth = require( 'fuel-auth' );
module.exports = function(app) {

	app.post('/emailDeployService', function (req, res) {

		console.log('Reached the deployFunction');
		
		// console.log('req'+req);
		console.log('req'+req.body.recordsToDeploy);
		console.log('req'+req.body.AuthenticationToken);

		// var body = {'page':{'page':'1','pageSize':'50'},'query':{'leftOperand':{'property':'assetType.name','simpleOperator':'equal','value':'textonlyemail'},'logicalOperator':'OR','rightOperand':{'property':'assetType.name','simpleOperator':'equal','value':'textonlyemail'}}};
		// body1 = new Uint8Array(body.toArrayBuffer());
		//Case1 : SimpleTextEmail

		// if(req.body.ObjectType == 'emails'){

			// Create the POST Request for the fetching Simple Text Emails

			console.log(RestClient);

			var options = {
	        	uri: '/asset/v1/content/assets',
	       	 	headers: {
		            'content-type': 'application/json',
		            'Authorization': 'Bearer' +' '+ req.body.AuthenticationToken,  
				},
				json: true,
				body: req.body.recordsToDeploy
			 }

			

			RestClient.post(options,function(err, data) {
				console.log('reached here');
				if(err) {
					// error here
					console.log("error ",err);
					return;
				}
				console.log("data ", data);
				res.send(data);
			});




		// }
	});
}