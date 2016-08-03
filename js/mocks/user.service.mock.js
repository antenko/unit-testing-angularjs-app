angular.module('user-service-mock', []).provider('userService', function() {
	this.$get = function() {
		return {
			login: jasmine.createSpy()
		};
	};
});