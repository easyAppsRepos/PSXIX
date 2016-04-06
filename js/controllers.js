/***********************************************************
  Programador: Jose Alfaro.  
  Email: jralfarog@gmail.com
************************************************************/


angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('nuevaNotaCtrl', function($scope, $http,  $ionicLoading, $cordovaNetwork, $timeout, $q, $ionicPopup) {
$scope.report={};
  $scope.enviarNota=function(notaAdd){




    var isOnline = $cordovaNetwork.isOnline()

    if(isOnline){

      $ionicLoading.show({
      template: 'Cargando...'
    });

        $http.post('http://mantenimiento.posadasigloxix.com.uy/api/notas/add?comentario='+notaAdd) 
        .success(function(res){
              $ionicLoading.hide();

              $ionicPopup.alert({
              title: 'Nota agregada',
              content: 'La nota fue agregada'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });

          $scope.report.comment='';
         
        })
        .error(function(err){
    
            $ionicLoading.hide();
         alert("Ha ocurrido un error, la nota no pudo ser agregada");
        });
		}
   		else{
                    $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });

      }
  }
})

.controller('nuevaTareaCtrl', function($scope, $cordovaNetwork, $cordovaCamera, $cordovaFileTransfer, $ionicModal, $timeout, $http,$ionicLoading, $q, $ionicPopup) {

$scope.foto={};
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
    $scope.foto='';
    $scope.modal.hide();
  };


  $scope.login = function() {
    $scope.modal.show();
    $scope.btnTomarFoto = true;
  };



    $scope.enviarFoto = function(comentario, prioridadFoto){
   var isOnline = $cordovaNetwork.isOnline();
   if(prioridadFoto !== undefined){

    if(isOnline){



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
            $scope.closeLogin(); 
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
    options.fileKey = "foto";
    options.fileName = $scope.imgURI.substr($scope.imgURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = {};
    params.comentario = comentario;
    params.prioridad = prioridadFoto;

    options.params = params; //
    var ft = new FileTransfer();
    ft.upload($scope.imgURI, encodeURI("http://mantenimiento.posadasigloxix.com.uy/api/tareas/add"), win, fail, options);
    $scope.foto='';


}else{

            $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });

}
  }else{

            $ionicPopup.alert({
              title: 'Espacio requerido',
              content: 'Debe definir una prioridad'
            }).then(function(res) {
              console.log('priori');
            });


  }

  }


    $scope.takePhoto = function () {
   var isOnline = $cordovaNetwork.isOnline();
   if(isOnline){
$scope.btnTomarFoto = false;
    var options = {
      quality: 100,
      //destinationType: Camera.DestinationType.DATA_URL,
      destinationType: Camera.DestinationType.FILE_URI,
      correctOrientation: true,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth:  1600,
      targetHeight: 1600,
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
      } else{
                    $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });
      }

    
  }



})



.controller('listaNotasCtrl', function($scope, $ionicLoading, $http, $cordovaNetwork, $timeout, $q, $ionicPopup) {

   var isOnline = $cordovaNetwork.isOnline();
  
    $scope.actualizarNotas = function(){
     isOnline = $cordovaNetwork.isOnline();
 	if(isOnline){
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
     else{
                          $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });

    }
  }


$scope.actualizarNotas();
      

      $scope.archivarNota=function(idNota){
      	  var isOnline = $cordovaNetwork.isOnline();
if(isOnline){
   $ionicLoading.show({
      template: 'Cargando...'
    });

        $http.get('http://mantenimiento.posadasigloxix.com.uy/api/notas/archivar/'+idNota) 
        .success(function(res){
          $ionicLoading.hide();

          if(res=="OK"){
            
              $ionicPopup.alert({
              title: 'Nota archivada',
              content: 'La nota fue archivada'
            }).then(function(res) {
              console.log('nota archi');
            });

          }
          else{
            alert("Ha ocurrido un error");

          }
        $scope.actualizarNotas();
        })
        .error(function(err){

        $ionicLoading.hide();
         alert("Ha ocurrido un error");
        });
        }
        else{

                    $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });

        }
      }


});
