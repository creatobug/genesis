var genesis = angular.module('genesis', ['ngRoute','genesisController', 'thatisuday.ng-spin']);

genesis.config(['$routeProvider','$locationProvider', 'ngSpinOpsProvider', '$httpProvider',function($routeProvider,$locationProvider, ngSpinOpsProvider, $httpProvider){
  console.log('ngSpinOpsProvider', ngSpinOpsProvider);
  ngSpinOpsProvider.setOps({
		autoGlobal : true,
		spinner : 'bars', // bars, big-bang, binary, cubes, flipboard, ping, plane, snake, sos, worm
		size : 'normal',
		color : 'black',
		position : 'center',
		blocking : false,
		delay : 0,
		extend : 100
  });
  
  $httpProvider.interceptors.push('myHttpInterceptor');
  // var spinnerFunction = function (data, headersGetter, $ngSpin) {
  //     // todo start the spinner here
  //     //alert('start spinner');
  //     $ngSpin.start();
  //     return data;
  // };

$locationProvider.html5Mode(true);
$routeProvider

.when('/',{
templateUrl : 'partials/login',
controller : 'LoginController'
})

.when('/login', {
templateUrl : 'partials/login',
controller : 'LoginController'
})

.when('/home', {
templateUrl : 'partials/home',
controller : 'HomeController'
})

.when('/components', {
templateUrl : 'partials/components',
controller : 'componentsController'
})

.when('/destinationOrg', {
templateUrl : 'partials/destinationOrg',
controller : 'destinationOrgController'
})

.when('/login1', {
templateUrl : 'partials/login1',
controller : 'Login1Controller'
})

.when('/source', {
templateUrl : 'partials/source',
controller : 'SourceController'
})

.when('/successPage', {
templateUrl : 'partials/successPage',
controller : 'successPageController'
})

.otherwise({
redirectTo:'/'
});



}
]);
genesis.factory('myHttpInterceptor', function($q) {
  return {
    // optional method
    'request': function(config) {
      // do something on success
      return config;
    },

    // optional method
   'requestError': function(rejection) {
      // do something on error
      console.log(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
      console.log(rejection);
    }
  };
});