'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


    .controller('View1Ctrl',View1Ctrl );


function View1Ctrl($scope,FormDetailsService,ngNotify,UserDetailsService){

    UserDetailsService.ReloadPage();
      $scope.forms_list=[
      ];


    $scope.query={};
    $scope.query.type="none";
    $scope.query.gosh="";
    $scope.query.helka="";
    $scope.query.megrash="";
    $scope.query.name="";


    FormDetailsService.getLast10Forms().then(function (result) {
            if (result != null) {
                $scope.forms_list = result;
            }
        }, function (err) {
        }
    );

    $scope.goSearchBy=function () {

        if(  ($scope.query.type=="none" ||$scope.query.type=="") && $scope.query.name=="" &&  $scope.query.gosh=="" &&  $scope.query.helka==""&& $scope.query.megrash==""){
            //notification to choose one
            ngNotify.set('הזן נתונים לחיפוש', 'error');
        }else{

             FormDetailsService.getFormByQuery($scope.query).then(function (result) {
                 $scope.forms_list=result;
             }, function (err) {
             }
             );
        }
    }

    $scope.clearSearch=function () {

        $scope.query={};
        $scope.query.name="";
        $scope.query.gosh="";
        $scope.query.helka="";
        $scope.query.megrash="";
        $scope.query.type="none";
    }


    $scope.OpenForm=function(_id){
        var url="#!/view_form?";
        window.open(url+"id="+_id);
    }
};