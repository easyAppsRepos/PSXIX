/***********************************************************
  Programador: Jose Alfaro.  
  Email: jralfarog@gmail.com
************************************************************/


angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('nuevaNotaCtrl', function($scope, $http,  $ionicLoading) {

  $scope.enviarNota=function(notaAdd){

      $ionicLoading.show({
      template: 'Cargando...'
    });


        $http.post('http://mantenimiento.posadasigloxix.com.uy/api/notas/add?comentario='+notaAdd) 
        .success(function(res){
              $ionicLoading.hide();

          alert("Nota agregada correctamente");
        })
        .error(function(err){
    
            $ionicLoading.hide();
         alert("Ha ocurrido un error, la nota no pudo ser agregada");
        });

   
  }
})

.controller('nuevaTareaCtrl', function($scope, $cordovaCamera, $ionicModal, $timeout, $http,$ionicLoading) {

$scope.btnTomarFoto = true;

$ionicModal.fromTemplateUrl('templates/subirFoto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


  $scope.login = function() {
    $scope.modal.show();
    $scope.btnTomarFoto = true;
  };



    $scope.enviarFoto = function(comentario, prioridadFoto){

          $ionicLoading.show({
      template: 'Cargando...'
    });


      console.log(comentario + "-"+ prioridadFoto + "-"+ $scope.imgURI);
            $http.post('http://mantenimiento.posadasigloxix.com.uy/api/tareas/add?comentario='+comentario+'&foto='+$scope.imgURI+'&prioridad='+prioridad)
            .then(function(response){

            $ionicLoading.hide();
            alert("Tarea Agregada");
            },function(response){

            $ionicLoading.hide();
            alert("Ha ocurrido un error agregando la tarea");

            });
    }


    $scope.takePhoto = function () {

$scope.btnTomarFoto = false;
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      //destinationType: Camera.DestinationType.FILE_URI,
      
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
        //$scope.imgURI=imageData;
       $scope.login();

      }, function (err) {
         
      });

  }



})



.controller('listaNotasCtrl', function($scope, $ionicLoading, $http) {


    $scope.actualizarNotas = function(){

      $ionicLoading.show({
      template: 'Cargando...'
    });


     $http.get('http://mantenimiento.posadasigloxix.com.uy/api/notas')
    .success(function(res){
      $scope.notas = res;

      $ionicLoading.hide();
    }).finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
  }


$scope.actualizarNotas();
      

      $scope.archivarNota=function(idNota){

   $ionicLoading.show({
      template: 'Cargando...'
    });

        $http.get('http://mantenimiento.posadasigloxix.com.uy/api/notas/archivar/'+idNota) 
        .success(function(res){
          $ionicLoading.hide();

          if(res=="OK"){
            
          alert("Nota Archivada");
          }
          else{alert("Ha ocurrido un error");}
        $scope.actualizarNotas();
        })
        .error(function(err){

        $ionicLoading.hide();
         alert("Ha ocurrido un error");
        });
      }


});
