angular.module('invite-user-provider-mock', []).provider('inviteUser', function () {
	this.$get = function () {
		return {
			getInvitation: jasmine.createSpy()
		};
	};
});