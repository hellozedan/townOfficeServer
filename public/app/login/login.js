'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])
    .controller('LoginCtrl',LoginCtrl );

    function LoginCtrl($scope,UserDetailsService,$rootScope,ngNotify){

        $rootScope.UserDetails=UserDetailsService.GetUserDetails();
        if($rootScope.UserDetails&&$rootScope.UserDetails.isAdmin){
            window.open("#!/view1", '_self', false);
        }
        $scope.username="";
        $scope.password="";

      $scope.TryLogin=function () {
          if($scope.username =="" || $scope.password==""){
              ngNotify.set('  יש להקליד שם משתמש וסיסמה  ', 'error');
          }else {
              UserDetailsService.GetUser($scope.username, $scope.password).then(function (result) {
                  UserDetailsService.SetUserDetails(result);
                      window.open("#!/view1", '_self', false);
                       $rootScope.$emit("CallRefreshUserDetails", {});
                  }, function (err) {

                      ngNotify.set('שגיאה בשם משתמש או בסיסמה', 'error');
                  }
              );
          }
      }


    }
