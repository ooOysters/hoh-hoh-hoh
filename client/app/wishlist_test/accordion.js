angular.module('description', ['ui.bootstrap'])

.controller('descriptionController', function($scope, $http, $log) {
  
  $scope.products = [
    {
      title: 'Ipod',
      content: 'Description',
      stock: false //example
    }
  ];

  $scope.addNew = function() {
    $scope.products.push({
      title: 'ipod',
      content: 'Dynamically added new one',
      stock: false
    });
  };
});

