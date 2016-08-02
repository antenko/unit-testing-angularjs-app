angular.module('login-app', [])
	.config(['InviteUserProvider', function(InviteUserProvider) {
		var names = ['friend', 'visitor'];
		var randomNameIndex = Math.floor(Math.random() * names.length);
		InviteUserProvider.configure(names[randomNameIndex]);
	}]);