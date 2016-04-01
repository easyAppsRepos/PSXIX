/***********************************************************
  Programador: Jose Alfaro.  
  Email: jralfarog@gmail.com
************************************************************/

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


 $ionicConfigProvider.tabs.position('top');
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

 

  .state('tab.nuevaNota', {
    url: '/nuevaNota',
    views: {
      'tab-nuevaNota': {
        templateUrl: 'templates/tab-nuevaNota.html',
        controller: 'nuevaNotaCtrl'
      }
    }
  })

  .state('tab.nuevaTarea', {
      url: '/nuevaTarea',
      views: {
        'tab-nuevaTarea': {
          templateUrl: 'templates/tab-nuevaTarea.html',
          controller: 'nuevaTareaCtrl'
        }
      }
    })


  .state('tab.listaNotas', {
    url: '/listaNotas',
    views: {
      'tab-listaNotas': {
        templateUrl: 'templates/tab-listaNotas.html',
        controller: 'listaNotasCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/tab/nuevaNota');

});
