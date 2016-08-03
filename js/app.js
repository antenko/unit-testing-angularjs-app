angular.module('login-app', [])
	.config(['inviteUserProvider', function(inviteUserProvider) {
		var names = ['friend', 'visitor'];
		var randomNameIndex = Math.floor(Math.random() * names.length);
		inviteUserProvider.configure(names[randomNameIndex]);
	}]);