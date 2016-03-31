angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('DashCtrl', function($scope) {

  $scope.enviarNota=function(nota){

    alert(nota);
  }
})

.controller('ChatsCtrl', function($scope, $cordovaCamera, $ionicModal, $timeout) {



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



    $scope.enviarFoto = function(){

      alert($scope.imgURI);
    }


    $scope.takePhoto = function () {
    var options = {
      quality: 75,
      //destinationType: Camera.DestinationType.DATA_URL,
      destinationType: Camera.DestinationType.FILE_URI,
      
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        //  $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.imgURI=imageData;
       $scope.login();

      }, function (err) {
          // An error occured. Show a message to the user
      });

  }



})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {

      $scope.archivarNota=function(idNota){

        alert('{id:'+idNota+'}');
      }


});
