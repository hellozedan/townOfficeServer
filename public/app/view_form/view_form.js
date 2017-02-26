'use strict';

angular.module('myApp.view_form', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view_form', {
            templateUrl: 'view_form/view_form.html',
            controller: 'FormViewCtrl'
        });
    }])
    .controller('FormViewCtrl', FormViewCtrl);

function FormViewCtrl($scope,FormDetailsService,UserDetailsService) {
    UserDetailsService.ReloadPage();


    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    var id = getParameterByName('id');


    FormDetailsService.getFormByID(id).then(function (result) {
            if (result != null) {
                $scope.form1 = result;
                $scope.form1.date=new Date(result.date);
            }
        }, function (err) {
        }
    );


    $scope.printPage = function () {
        window.print();
    }

  /*
    $scope.addRowToTable = function () {
        $scope.form1.table.push({
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
            col7: ''
        })
    }

    $scope.removeRowFromTable = function (index) {
        $scope.form1.table.pop();
    }*/


   /* $scope.editForm=function () {

        FormDetailsService.edit($scope.form1).then(function (result) {
                console.log('edited');
            }, function (err) {
            }
        );
    }*/
}

