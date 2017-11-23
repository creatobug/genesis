var app = angular.module('app', []);
// app.factory('LoginService', function($http) {
// 	// Attempt a login here

    
//     return {
//       login : function(Cid, cpass) {
// 		  console.log('login Attempted');
// 		  //invoke the login at the server using client ID and Clinet secret
// 		  console.log(Cid);
// 		  console.log(cpass);
// 		  return $http({method: 'POST', url: 'http://localhost:3000/loginservice',params: {clientid:Cid,clientsecret:cpass}})
// 		  .success(function(data, status) {
// 			console.log("Reached");
// 			console.log(data);
// 			AuthenticationToken = data;
// 			isAuthenticated = true;
// 		  })
// 		  .error(function(data, status) {
// 			 console.log('FAILED'+data);
// 		});
// 		  return isAuthenticated;
// 		}
//   };

  //});