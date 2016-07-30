angular.module('user-service-mock', []).provider('UserService', function() {
	this.$get = function() {
		return {
			login: jasmine.createSpy()
		};
	};
});