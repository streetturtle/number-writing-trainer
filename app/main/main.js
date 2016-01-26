'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.show=false;
  $scope.lower=0;
  $scope.upper=10;

  $scope.langOptions = [{ name: 'English', code: 'en' },
                        { name: 'French', code: 'fr' },
                        { name: 'Spanish', code: 'sp' },
                        { name: 'Portuguese', code: 'pt' }];

  $scope.language = $scope.langOptions[0].code;

  $scope.generateWord = function(){
    $scope.result = writtenNumber($scope.number, { lang: $scope.language });
  }

  $scope.refresh = function(){
    $scope.number = Math.floor(Math.random() * $scope.upper) + $scope.lower;
    $scope.generateWord();
    $scope.inputString='';
    $scope.show=false;
  }

  $scope.refresh();

  $scope.check = function(){
    if ($scope.inputString == $scope.result){
      $timeout(function(){
        return $scope.refresh();
      },500)
    }
  }
}]);
