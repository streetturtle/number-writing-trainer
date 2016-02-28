'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

  $scope.showSettings = false;
  $scope.showNumber = true;
  $scope.doPlay = false;

  $scope.show = false;
  $scope.lower = 0;
  $scope.upper = 10;

  $scope.langOptions = [{
      name: 'English',
      code: 'en'
    },
    {
      name: 'French',
      code: 'fr'
    },
    {
      name: 'Spanish',
      code: 'sp'
    },
    {
      name: 'Portuguese',
      code: 'pt'
    }];

  $scope.language = $scope.langOptions[0].code;

  $scope.generateWord = function () {
    $scope.result = writtenNumber($scope.number, {
      lang: $scope.language
    });
  }

  $scope.isSpeakNumberSupported = function(){
    return ('speechSynthesis' in window);
  }

  $scope.play = function () {
    var msg = new SpeechSynthesisUtterance();
    msg.text = $scope.number.toString();
    msg.lang = $scope.language;
    window.speechSynthesis.speak(msg);
  }

  $scope.refresh = function () {
    $scope.number = Math.floor(Math.random() * $scope.upper) + $scope.lower;
    $scope.generateWord();
    $scope.inputString = '';
    $scope.show = false;
    if ($scope.doPlay)
      $scope.play();
  }

  $scope.refresh();

  $scope.check = function () {
    if ($scope.inputString.toUpperCase() == $scope.result.toUpperCase()) {
      $timeout(function () {
        return $scope.refresh();
      }, 500)
    }
  }
}]);
