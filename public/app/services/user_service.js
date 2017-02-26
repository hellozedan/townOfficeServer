'use strict';

function UserDetailsService($http, $q) {

    var apiBase='https://townoffices.herokuapp.com/api/';
  /*  var  apiBase= 'http://localhost:3000/api/';*/
    var userDetails = null;


    var GetUserDetails = function () {
        if (!userDetails) {
            userDetails = angular.fromJson(window.localStorage['userDetails']);
        }
        return userDetails;
    }
    var SetUserDetails = function (user) {
        userDetails = user;
        window.localStorage['userDetails'] = angular.toJson(user);
    }



    var GetUser= function (username,password) {
        var deferred = $q.defer();
        $http.get(apiBase+'users/getUserByUsername?username=' + username+'&password=' + password, { headers: { 'Content-Type': 'application/json' } })
        .success(function (data) {
            deferred.resolve(data);
        }).error(function (msg, code) {
            deferred.reject(msg);
            //   $log.error(msg, code);
        });
        return deferred.promise;
    }

    var ReloadPage = function () {
        var user = GetUserDetails();
        if (!user || !(user.isAdmin))
            window.open("#!/login", '_self', false);


    }

    return ({
        GetUserDetails: GetUserDetails,
        SetUserDetails: SetUserDetails,
        GetUser:GetUser,
        ReloadPage:ReloadPage
    });

}

angular
    .module('myApp')
    .factory('UserDetailsService', UserDetailsService);
