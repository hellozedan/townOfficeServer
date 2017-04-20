'use strict';

angular.module('myApp.edit_form2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit_form2', {
            templateUrl: 'edit_form2/edit_form2.html',
            controller: 'EditForm2Ctrl'
        });
    }])
    .controller('EditForm2Ctrl', EditForm2Ctrl);

function EditForm2Ctrl($scope,FormDetailsService,ngNotify,UserDetailsService) {

    UserDetailsService.ReloadPage();
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
    $scope.form1 = {};
    FormDetailsService.getFormByID(id).then(function (result) {
            if (result != null) {
                $scope.form1 = result;
                $scope.form1.date=new Date(result.date);

            }
        }, function (err) {
        }
    );

  /*  $scope.form1.note = {isNote:false,noteText:"הערה:  "};
    $scope.form1.isOld = getParameterByName('isOld');
    $scope.form1.date = new Date();
    $scope.form1.name="תאגיד אלעין";*/


    $scope.printPage = function () {
        window.print();
    }

  /*  $scope.form1.table_details = [

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
    ]*/


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
    $scope.addRemoveNote=function (status) {
        $scope.form1.note = {isNote:status,noteText:"הערה:  "};
    }

    $scope.saveChangesForm=function () {
        /* $scope.form1.type="water";
         $scope.form1.type_he="מים";*/
        FormDetailsService.edit($scope.form1).then(function (result) {
                ngNotify.set('הטופס נשמר בצלחה', 'success');
            }, function (err) {
            }
        );
    }

    $scope.replaceShekel=function(row){
        var str = row.col7;
        var res = str.replace(/ש"ח/g, "₪");
        row.col7=res;
        document.getElementById("demo").innerHTML = res;
    }
}

