angular.module('login-app').controller('LoginController', ['$scope', '$rootScope', '$timeout', 'UserService', 'InviteUser', function ($scope, $rootScope, $timeout, UserService, InviteUser) {
	var vm = this;
	vm.login = '';
	vm.password = '';
	vm.user = null;
	vm.authError = null;
	vm.invitation = InviteUser.getInvitation();

	$scope.$on('user.auth.success', function (event, userData) {
		vm.user = userData;
	});

	vm.onLogin = function () {
		UserService.login(vm.login, vm.password).then(function (userData) {
			vm.login = '';
			vm.password = '';
			$scope.$emit('user.auth.success', userData);
		}, function (error) {
			vm.authError = 'Error #' + error.code + ': ' + error.message;
			$timeout(function () {
				vm.authError = null;
			}, 5000);
		});
	};
}]);