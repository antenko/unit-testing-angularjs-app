angular.module('hello-good-day-provider-mock', []).provider('HelloGoodDay', function() {
	this.$get = function() {
		return {
			getInvitation: jasmine.createSpy()
		};
	};
});