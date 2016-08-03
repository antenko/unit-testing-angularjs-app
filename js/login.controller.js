angular.module('login-app').controller('LoginController', ['$scope', '$rootScope', '$timeout', 'userService', 'inviteUser', function ($scope, $rootScope, $timeout, userService, inviteUser) {
	var vm = this;
	vm.login = '';
	vm.password = '';
	vm.user = null;
	vm.authError = null;
	vm.invitation = inviteUser.getInvitation();

	$scope.$on('user.auth.success', function (event, userData) {
		vm.user = userData;
	});

	vm.onLogin = function () {
		userService.login(vm.login, vm.password).then(function (userData) {
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