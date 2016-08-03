angular.module('login-app')
	.provider('inviteUser', function () {
		var name;
		return {
			configure: function (value) {
				name = value;
			},
			$get: function () {
				return {
					getInvitation: function () {
						name = name || 'guest';
						return 'Hello my Dear ' + name + '! Log in, please.';
					}
				};
			}
		};
	});