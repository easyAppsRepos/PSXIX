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

.controller('nuevaTareaCtrl', function($scope, $cordovaCamera, $cordovaFileTransfer, $ionicModal, $timeout, $http,$ionicLoading) {

$scope.btnTomarFoto = true;

function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;

function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        retries = 0;
        alert('Listo!');
    }
 
    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            alert('Ups. Ha ocurrido un error!');
        }
    }
  var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://host/upload"), win, fail, options);
}

function capturePhoto() {
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 100,
        destinationType: destinationType.FILE_URI
    });
}
 
function onFail(message) {
    alert('Failed because: ' + message);
}





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

/*
      console.log(comentario + "-"+ prioridadFoto + "-"+ $scope.imgURI);
            $http.post('http://mantenimiento.posadasigloxix.com.uy/api/tareas/add?comentario='+comentario+'&foto='+$scope.imgURI+'&prioridad='+prioridad)
            .then(function(response){

            $ionicLoading.hide();
            alert("Tarea Agregada");
            },function(response){

            $ionicLoading.hide();
            alert("Ha ocurrido un error agregando la tarea");

            });
            */

            //$scope.imgURI

        var win = function (r) {

             console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    
        clearCache();
        retries = 0;
        $ionicLoading.hide();
        alert('Listo!');
         }

         var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                $scope.enviarFoto(comentario, prioridadFoto);
            }, 1000)
        } else {
            retries = 0;
            clearCache();
                $ionicLoading.hide();
            alert('Ups. Ha ocurrido un error!');
        }
         }
 var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = $scope.imgURI.substr($scope.imgURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = {};
    params.comentario = comentario;
    params.prioridad = prioridadFoto;

    options.params = params; //
    var ft = new FileTransfer();
    ft.upload($scope.imgURI, encodeURI("http://mantenimiento.posadasigloxix.com.uy/api/tareas/add"), win, fail, options);



    }


    $scope.takePhoto = function () {

$scope.btnTomarFoto = false;
    var options = {
      quality: 50,
      //destinationType: Camera.DestinationType.DATA_URL,
      destinationType: Camera.DestinationType.FILE_URI,
      correctOrientation: true,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
      //    $scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.imgURI=imageData;
       $scope.login();

      }, function (err) {
             $scope.btnTomarFoto = true;
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
