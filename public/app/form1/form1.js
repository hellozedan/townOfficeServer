'use strict';

angular.module('myApp.form1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/form1', {
            templateUrl: 'form1/form1.html',
            controller: 'Form1Ctrl'
        });
    }])
    .controller('Form1Ctrl', Form1Ctrl);

function Form1Ctrl($scope,FormDetailsService,ngNotify,UserDetailsService) {

    UserDetailsService.ReloadPage();
    $scope.form1 = {};
    $scope.form1.date = new Date();
    $scope.form1.name="תאגיד העין";


    $scope.printPage = function () {
        window.print();
    }

    $scope.form1.table_details = [

        {
            col1: '  ',
            col2: '  ',
            col3: '',
            col4: '  ',
            col5: '',
            col6: '',
            col7: ''
        },
        {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
            col7: ''
        },
        {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
            col7: ''
        },
        {
            col1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
            col7: ''
        }
    ]


    $scope.addRowToTable = function () {
        $scope.form1.table_details.push({
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
        $scope.form1.table_details.pop();
    }


    $scope.saveForm=function () {
        $scope.form1.type="water";
        $scope.form1.type_he="מים";
        FormDetailsService.create($scope.form1).then(function (result) {
            ngNotify.set('הטופס נשמר בצלחה', 'success');
            }, function (err) {
            }
        );
    }
}

