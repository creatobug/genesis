var fs = require('fs');
module.exports = function(app) {

	app.post('/updateJsonFile',function(req,res){
			console.log('updateJsonFile Called'+req.body.clientId);
			console.log('updateJsonFile Called'+req.body.clientSecret);
			console.log('updateJsonFile Called'+req.body.orgName);

			// var jsonData = JSON.parse(req.body);

			// Read the JSON file , Convert it to a JSON object, updateRecord and update JSON file
			


					fs.readFile('./public/data/orginformation.json', 'utf8', function readFileCallback(err, data){
					    if (err){
					        console.log(err);
					    } else {
					    obj = JSON.parse(data); //now it an object
					    if(req.body.action == 'create'){
					    	delete req.body['action'];
					    	obj.push(req.body); //add some data
					    }		
					    else if(req.body.action == 'delete'){
					    	delete req.body['action'];
					    	// var i=0;
					    	// obj.foreach(function checkMatch(node) {
					    		console.log(obj.length);
					    	for(var i = 0; i < obj.length; i++) {
								console.log('file'+obj[i].orgName);
								console.log('rec'+req.body.orgName);
					    		if(obj[i].orgName == req.body.orgName)
					    		{
					    			obj.splice(i, 1);
					    			break;
					    		}
				
					    		// body...
					    	}

					    }
					    json = JSON.stringify(obj); //convert it back to json
					    fs.writeFile('./public/data/orginformation.json', json, 'utf8', function(err) {if(err) console.log(err)}); // write it back 
					    res.send('data');
					}});


	});
}