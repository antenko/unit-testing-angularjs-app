angular.module('login-app')
	.provider('HelloGoodDay', function () {
		var name;
		return {
			configure: function (value) {
				name = value;
			},
			$get: function () {
				return {
					getInvitation: function () {
						return 'Hello my Dear ' + name + '! Log in, please.';
					}
				};
			}
		};
	});