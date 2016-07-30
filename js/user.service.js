angular.module('login-app').factory('UserService', ['$http', '$q', function ($http, $q) {
	function login(login, password) {
		return $http.post('users/login', {
			login: login,
			password: password
		}).then(function (response) {
			return response.data;
		}, function (response) {
			var data = response.data || {};
			return $q.reject({
				code: data.serverErrorCode || -1,
				message: data.serverErrorMessage || 'Undefined error'
			})
		});
	}

	return {
		login: login
	}
}]);