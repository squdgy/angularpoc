'use strict';

/* App Module */

/*
// single-page
angular.module('contests', ['contestServices']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
      when('/app/contests', {templateUrl: 'partials/contest-list.html',   controller: ContestListCtrl}).
      when('/app/contests/:contestId', {templateUrl: 'partials/contest-detail.html', controller: ContestDetailCtrl}).
      otherwise({redirectTo: '/app/contests'});
  $locationProvider.html5Mode(true);      
}]);
*/

angular.module('contests', ['contestServices']).
  config(['$routeProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
      when('/contests', {templateUrl: 'partials/contest-list.html',   controller: ContestListCtrl}).
      when('/contests/:contestId', {templateUrl: 'partials/contest-list.html', controller: ContestListCtrl}).
      otherwise({redirectTo: '/contests'});
}]);
