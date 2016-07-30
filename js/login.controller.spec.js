describe('Login Controller', function () {
	var $scope,
		ctrl,
		UserService,
		loginDefer;

	beforeEach(module('login-app'));
	beforeEach(module('user-service-mock'));

	beforeEach(inject(['$controller', '$rootScope', '$q', 'UserService', function ($controller, $rootScope, $q, _UserService_) {
		UserService = _UserService_;

		loginDefer = $q.defer();
		UserService.login.and.returnValue(loginDefer.promise);

		$scope = $rootScope.$new();
		ctrl = $controller('LoginController', {$scope: $scope})
	}]));

	describe('Login method', function () {
		it('should exist', function () {
			expect(ctrl.onLogin).toBeDefined();
		});

		it('should call user service', function () {
			ctrl.onLogin();
			expect(UserService.login).toHaveBeenCalled();
		});

		it('should call user service with correct params', function () {
			ctrl.login = 'myLogin';
			ctrl.password = 'myPassword';
			ctrl.onLogin();
			expect(UserService.login).toHaveBeenCalledWith(ctrl.login, ctrl.password);
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

		it('should set user data after auth event', function () {
			$scope.$emit('user.auth.success', {user: 'auth'});

			expect(ctrl.user).toEqual({user: 'auth'});
		});
	});
});