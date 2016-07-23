require('./user.service');

angular.module('login-app').controller('LoginController', ['$scope', 'UserService', function ($scope, UserService) {
	$scope.login = '';
	$scope.password = '';
	$scope.user = null;
	$scope.authError = null;

	$scope.onLogin = function () {
		UserService.login($scope.login, $scope.password).then(function () {
			console.log('LOGIN SUCCESS!!');
		}, function () {
			console.error('LOGIN FAILED!!');
		});
	};
}]);