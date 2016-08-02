angular.module('hello-good-day-provider-mock', []).provider('InviteUser', function() {
	this.$get = function() {
		return {
			getInvitation: jasmine.createSpy()
		};
	};
});