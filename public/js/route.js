var genesis = angular.module('genesis', ['ngRoute','genesisController']);

genesis.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

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