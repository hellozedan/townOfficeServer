'use strict';
function ConfigurationService($state) {


  return {

    isServerDown: function (data) {
      if (!data) {
        $state.go('login');
        console.log("somthing got wrong !!");

      }

    }


  }
}
function FormDetailsService($http, $q) {

    var apiBase='https://townoffices.herokuapp.com/api/';

  /*   var  apiBase= 'http://localhost:3000/api/';*/

  return ({
    create: create,
    edit:edit,
    getAllForms:getAllForms,
    getFormByID:getFormByID,
    getFormByQuery:getFormByQuery,
      getLast10Forms:getLast10Forms,
      deleteFormById:deleteFormById

  });
  function getAllForms() {
    var deferred = $q.defer();

    $http.get(apiBase+'form_details/getAllForms', { headers: { 'Content-Type': 'application/json' } })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          /*ConfigurationService.isServerDown(data);*/
          deferred.reject(data);
        });

    return deferred.promise;
  }

    function getLast10Forms() {
        var deferred = $q.defer();

        $http.get(apiBase+'form_details/getLast10Forms', { headers: { 'Content-Type': 'application/json' } })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                /*ConfigurationService.isServerDown(data);*/
                deferred.reject(data);
            });

        return deferred.promise;
    }

  function getFormByID(id) {
    var deferred = $q.defer();

    $http.get(apiBase+'form_details/getFormByID?_id=' + id, { headers: { 'Content-Type': 'application/json' } })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
/*          ConfigurationService.isServerDown(data);*/
          deferred.reject(data);
        });

    return deferred.promise;
  }

    function deleteFormById(id) {
        var deferred = $q.defer();

        $http.get(apiBase+'form_details/deleteFormById?_id=' + id, { headers: { 'Content-Type': 'application/json' } })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                /*          ConfigurationService.isServerDown(data);*/
                deferred.reject(data);
            });

        return deferred.promise;
    }


  function create(body) {
    var deferred = $q.defer();

    $http.post(apiBase+'form_details/create', body, { headers: { 'Content-Type': 'application/json' } })
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
        /*  ConfigurationService.isServerDown(data);*/
          deferred.reject(data);
        });

    return deferred.promise;
  }

  function edit(body) {
    var deferred = $q.defer();

    $http.post(apiBase+'form_details/edit', body)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
        /*  ConfigurationService.isServerDown(data);*/
          deferred.reject(data);
        });

    return deferred.promise;
  }

  function getFormByQuery(query) {
    var deferred = $q.defer();

      var url="?";

          url += 'name=' + query.name+ '&gosh=' + query.gosh+'&helka=' + query.helka+ '&megrash=' + query.megrash + '&type=' + query.type + '&isOld=' + query.isOld + '&id=' + query.id;


    $http.get(apiBase+'form_details/getFormByQuery' + url)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
         /* ConfigurationService.isServerDown(data);*/
          deferred.reject(data);
        });

    return deferred.promise;
  }

}



// Declare app level module which depends on views, and components


angular
    .module('myApp')
    .factory('ConfigurationService', ConfigurationService)
    .factory('FormDetailsService', FormDetailsService);
