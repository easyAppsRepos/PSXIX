angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('DashCtrl', function($scope, $http,  $ionicLoading) {

  $scope.enviarNota=function(notaAdd){

      $ionicLoading.show({
      template: 'Loading...'
    });

console.log(notaAdd);
        $http.post('http://mantenimiento.posadasigloxix.com.uy/api/notas/add?comentario='+notaAdd) 
        .success(function(res){
              $ionicLoading.hide()
          alert("Nota agregada correctamente");
        })
        .error(function(err){
        console.error(err)
            $ionicLoading.hide()
         alert("Ha ocurrido un error, la nota no pudo ser agregada");
        });

   
  }
})

.controller('ChatsCtrl', function($scope, $cordovaCamera, $ionicModal, $timeout, $http,$ionicLoading) {



$ionicModal.fromTemplateUrl('templates/subirFoto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };



    $scope.enviarFoto = function(comentario, prioridadFoto){

          $ionicLoading.show({
      template: 'Loading...'
    });


      console.log(comentario + " = "+ prioridadFoto + " "+ $scope.imgURI);
            $http.post('http://mantenimiento.posadasigloxix.com.uy/api/tareas/add?comentario='+comentario+'&foto='+$scope.imgURI+'&prioridad='+prioridad)
            .success(function(res){
              console.log(res);
            $ionicLoading.hide()
            alert("Tarea Agregada");
            })
            .error(function(err){
            console.error(err)
            $ionicLoading.hide()
            alert("Ha ocurrido un error agregando la tarea");

            });
    }


    $scope.takePhoto = function () {
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
          // An error occured. Show a message to the user
      });

  }



})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})



.controller('AccountCtrl', function($scope, $ionicLoading, $http) {



     //   $scope.getNotas=function(){
    $scope.actualizarNotas = function(){

      $ionicLoading.show({
      template: 'Loading...'
    });

       //$scope.notas = Notas.all();

     $http.get('http://mantenimiento.posadasigloxix.com.uy/api/notas')
    .success(function(res){
      console.log("res: "+res);
      $scope.notas = res;

      $ionicLoading.hide()
    }).finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
  }


$scope.actualizarNotas();
      

     // }
             
          //   $scope.notas= {"$$state":{"status":0,"value":[{"comentario": "asd"},{"comentario": "asd"}]}};
        //         $scope.notas=  $scope.notas.$$state.value;

      $scope.archivarNota=function(idNota){


        $http.get('http://mantenimiento.posadasigloxix.com.uy/api/notas/archivar/'+idNota) 
        .success(function(res){
          console.log(res);
          if(res=="OK")
          alert("Nota Archivada");
        })
        .error(function(err){
        console.error(err)
         alert("Ha ocurrido un error");
        });
      }


});
