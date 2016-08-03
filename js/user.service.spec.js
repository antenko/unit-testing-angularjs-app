describe('Factory: userService', function () {
	var userService,
		$httpBackend;

	beforeEach(module('login-app'));
	beforeEach(inject(['userService', '$httpBackend', function (_userService_, _$httpBackend_) {
		userService = _userService_;
		$httpBackend = _$httpBackend_;
	}]));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('Method: login', function () {
		it('has login method', function () {
			expect(userService.login).toBeDefined();
		});

		it('should send POST request', function () {
			$httpBackend.expectPOST(/.*/ig).respond(200);
			userService.login();
			$httpBackend.flush();
		});

		it('should send request to correct URL', function () {
			$httpBackend.expectPOST('users/login').respond(200);
			userService.login();
			$httpBackend.flush();
		});

		it('should send request with correct params', function () {
			$httpBackend.expectPOST('users/login', {login: 'my_login', password: 'my_password'}).respond(200);
			userService.login('my_login', 'my_password');
			$httpBackend.flush();
		});

		it('should return promise', function () {
			$httpBackend.expectPOST('users/login').respond(200);
			var result = userService.login();
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
			userService.login().then(spyHandler);
			$httpBackend.flush();

			expect(spyHandler).toHaveBeenCalledWith(userObject);
		});

		it('should correctly handle server error', function () {
			$httpBackend.expectPOST('users/login').respond(500, {
				serverErrorCode: 123,
				serverErrorMessage: 'Error text'
			});
			var spyHandler = jasmine.createSpy('errorHandler');
			userService.login().then(null, spyHandler);
			$httpBackend.flush();

			expect(spyHandler).toHaveBeenCalledWith({code: 123, message: 'Error text'});
		});

		it('should correctly handle server error without description', function () {
			$httpBackend.expectPOST('users/login').respond(500);
			var spyHandler = jasmine.createSpy('errorHandler');
			userService.login().then(null, spyHandler);
			$httpBackend.flush();

			expect(spyHandler).toHaveBeenCalledWith({code: -1, message: 'Undefined error'});
		});
	});
});