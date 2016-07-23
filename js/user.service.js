angular.module('login-app').factory('UserService', ['$http', function ($http) {
	function login() {
		return $http.post('users/login');
	}

	return {
		login: login
	}
}]);