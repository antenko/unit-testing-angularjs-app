describe('Controller: LoginController', function () {
	var $scope,
		$timeout,
		ctrl,
		userService,
		inviteUser,
		loginDefer;

	beforeEach(module('login-app'));
	beforeEach(module('user-service-mock'));
	beforeEach(module('invite-user-provider-mock'));

	beforeEach(inject(['$q', '$timeout', 'userService', 'inviteUser', function ($q, _$timeout_, _userService_, _inviteUser_) {
		$timeout = _$timeout_;
		inviteUser = _inviteUser_;
		inviteUser.getInvitation.and.returnValue('MyInvitation!');

		loginDefer = $q.defer();
		userService = _userService_;
		userService.login.and.returnValue(loginDefer.promise);
	}]));

	beforeEach(inject(['$controller', '$rootScope', function ($controller, $rootScope) {
		$scope = $rootScope.$new();
		ctrl = $controller('LoginController', {$scope: $scope});
	}]));

	describe('State', function () {
		it('should have empty properties after initialization', function () {
			expect(ctrl.login).toBe('');
			expect(ctrl.password).toBe('');
			expect(ctrl.user).toBe(null);
			expect(ctrl.authError).toBe(null);
		});

		it('should have correct invitation', function () {
			expect(inviteUser.getInvitation).toHaveBeenCalled();
			expect(ctrl.invitation).toBe('MyInvitation!');
		});
	});

	describe('Method: login', function () {
		it('should exist', function () {
			expect(angular.isFunction(ctrl.onLogin)).toBe(true);
		});

		it('should call user service', function () {
			ctrl.onLogin();

			expect(userService.login).toHaveBeenCalled();
			expect(userService.login.calls.count()).toBe(1);
		});

		it('should call user service with correct params', function () {
			ctrl.login = 'myLogin';
			ctrl.password = 'myPassword';
			ctrl.onLogin();

			expect(userService.login).toHaveBeenCalledWith(ctrl.login, ctrl.password);
		});

		it('should call user service with correct params 2', function () {
			ctrl.login = 'myLogin2';
			ctrl.password = 'myPassword2';
			ctrl.onLogin();

			expect(userService.login).toHaveBeenCalledWith(ctrl.login, ctrl.password);
		});

		it('should clear form after positive promise resolve', function () {
			ctrl.login = 'myLogin';
			ctrl.password = 'myPassword';
			ctrl.onLogin();
			loginDefer.resolve();
			$scope.$apply();

			expect(ctrl.login).toBe('');
			expect(ctrl.password).toBe('');
		});

		it('should emit correct event after positive promise resolve', function () {
			var handlerSpy = jasmine.createSpy('eventHandler');
			$scope.$on('user.auth.success', handlerSpy);
			ctrl.onLogin();
			loginDefer.resolve({user: 'success'});
			$scope.$apply();

			expect(handlerSpy).toHaveBeenCalled();
			expect(handlerSpy.calls.argsFor(0)[1]).toEqual({user: 'success'});
		});

		it('should correctly handle promise reject', function () {
			ctrl.onLogin();
			loginDefer.reject({code: 123, message: 'My error'});
			$scope.$apply();

			expect(ctrl.authError).toEqual('Error #123: My error');
		});

		it('should clear auth error property after 5s timeout', function () {
			ctrl.onLogin();
			loginDefer.reject({code: 123, message: 'My error'});
			$scope.$apply();

			expect(ctrl.authError).toBeTruthy();

			$timeout.flush();
			expect(ctrl.authError).toBe(null);
			$timeout.verifyNoPendingTasks();
		});

		it('should set user data after auth event', function () {
			$scope.$emit('user.auth.success', {user: 'auth'});

			expect(ctrl.user).toEqual({user: 'auth'});
		});
	});
});