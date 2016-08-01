angular.module('login-app').directive('loginForm', [function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/login-form.htm',
		replace: true,
		scope: {
			login: '=',
			password: '=',
			onLogin: '&',
			error: '='
		},
		link: function (scope, el) {
			var submitBtn = angular.element(el[0].querySelector('[type="submit"]'));
			var submitInitText = submitBtn.text();

			scope.$watch('error', function (newValue) {
				if (newValue) {
					submitBtn.text(newValue)
						.addClass('error-btn');
				} else {
					submitBtn.text(submitInitText)
						.removeClass('error-btn');
				}
			});
		}
	}
}]);