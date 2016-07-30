describe('User Service', function () {
	var UserService,
		$httpBackend;

	beforeEach(module('login-app'));
	beforeEach(inject(['UserService', '$httpBackend', function (_UserService_, _$httpBackend_) {
		UserService = _UserService_;
		$httpBackend = _$httpBackend_;
	}]));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('method login', function () {
		it('has login method', function () {
			expect(UserService.login).toBeDefined();
		});

		it('should send POST request', function () {
			$httpBackend.expectPOST(/.*/ig).respond(200);
			UserService.login();
			$httpBackend.flush();
		});

		it('should send request to correct URL', function () {
			$httpBackend.expectPOST('users/login').respond(200);
			UserService.login();
			$httpBackend.flush();
		});

		it('should send request with correct params', function () {
			$httpBackend.expectPOST('users/login', {login: 'my_login', password: 'my_password'}).respond(200);
			UserService.login('my_login', 'my_password');
			$httpBackend.flush();
		});

		it('should return promise', function () {
			$httpBackend.expectPOST('users/login').respond(200);
			var result = UserService.login();
			$httpBackend.flush();

			expect(result.then).toBeDefined();
		});

		it('should return user object after success response', function () {
			var userObject = {
				name: 'myName',
				lastName: 'myLastName'
			};
			var spyHandler = jasmine.createSpy('successHandler');
			$httpBackend.expectPOST('users/login').respond(200, userObject);
			UserService.login().then(spyHandler);
			$httpBackend.flush();

			expect(spyHandler).toHaveBeenCalledWith(userObject);
		});

		it('should correctly handle server error', function () {
			$httpBackend.expectPOST('users/login').respond(500, {
				serverErrorCode: 123,
				serverErrorMessage: 'Error text'
			});
			var spyHandler = jasmine.createSpy('errorHandler');
			UserService.login().then(null, spyHandler);
			$httpBackend.flush();

			expect(spyHandler).toHaveBeenCalledWith({code: 123, message: 'Error text'});
		});

		it('should correctly handle server error without description', function () {
			$httpBackend.expectPOST('users/login').respond(500);
			var spyHandler = jasmine.createSpy('errorHandler');
			UserService.login().then(null, spyHandler);
			$httpBackend.flush();

			expect(spyHandler).toHaveBeenCalledWith({code: -1, message: 'Undefined error'});
		});
	});
});