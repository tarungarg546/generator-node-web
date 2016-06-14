angular.module('app', [])
  .controller('TodoController', function($scope, $http) {
    var vm=this;
    this.todos = [];
    this.todo = {};
    $http.get('/todo').success(function(data) {
      vm.todos = data;
    });
    this.addTodo = function() {
      $http.post('/todo', vm.todo).success(function(data) {
        vm.todos.unshift(data);
      });
      vm.todo = {};
    };
  });