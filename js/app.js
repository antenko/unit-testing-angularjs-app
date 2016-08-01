angular.module('login-app', [])
	.config(['HelloGoodDayProvider', function(HelloGoodDayProvider) {
		var names = ['friend', 'visitor'];
		var randomNameIndex = Math.floor(Math.random() * names.length);
		HelloGoodDayProvider.configure(names[randomNameIndex]);
	}]);