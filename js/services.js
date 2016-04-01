angular.module('starter.services', [])


.factory('Notas', function($q, $http) {

  // Trae todas las notas del api
  return {
    all: function() {
            var defer = $q.defer();
            $http.get('http://mantenimiento.posadasigloxix.com.uy/api/notas')
            .success(function(data) {
              console.log("data :"+data)
            defer.resolve(data);
            });
            console.log(defer.promise);
            return defer.promise;
    },
    remove: function() {
     
    },
    get: function() {

    }
  };
});