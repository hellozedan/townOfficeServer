'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngNotify',
  'myApp.view1',
  'myApp.view2',
  'myApp.view_form',
  'myApp.view_form2',
  'myApp.version',
  'myApp.form1',
  'myApp.form2',
  'login'
])
    .controller('navController',navController ).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});

}]);





function navController($scope,UserDetailsService,$rootScope){

  $rootScope.UserDetails=UserDetailsService.GetUserDetails();
  $scope.logout=function(){
    var user={};
    UserDetailsService.SetUserDetails(user);
    $scope.RefreshUser();
    window.open("#!/login", '_self', false);
  }

  $rootScope.$on("CallRefreshUserDetails", function(){
    $scope.RefreshUser();
  });
  $scope.RefreshUser=function () {
    $rootScope.UserDetails=UserDetailsService.GetUserDetails();
  }

};


