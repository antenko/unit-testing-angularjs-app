describe('Login Directive', function () {
	var scope,
		el;
	beforeEach(module('login-app'));
	beforeEach(module('app-templates'));
	beforeEach(inject(['$rootScope', '$compile', function ($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.login = '';
		scope.password = '';
		scope.onLogin = jasmine.createSpy('onLogin');
		scope.error = '';

		var loginForm = angular.element('<login-form login="login" password="password" on-login="onLogin()" error="error"></login-form>');
		el = $compile(loginForm)(scope);
		scope.$digest();
		el = $(el);
	}]));

	it('should correctly render form', function () {
		scope.login = 'my-login';
		scope.password = 'my-password';
		scope.$digest();

		expect(el.prop('tagName')).toBe('FORM');
		expect(el.find('#login').val()).toBe('my-login');
		expect(el.find('#password').val()).toBe('my-password');
		expect(el.find('#submit').prop('tagName')).toBe('BUTTON');
	});


	it('should correctly render error text on submit button after text change', function () {
		expect(el.find('#submit').text()).toBe('Log in');

		scope.error = 'My error';
		scope.$digest();
		expect(el.find('#submit').text()).toBe('My error');
		expect(el.find('#submit').hasClass('error-btn')).toBe(true);

		scope.error = '';
		scope.$digest();
		expect(el.find('#submit').text()).toBe('Log in');
		expect(el.find('#submit').hasClass('error-btn')).toBe(false);
	});

	it('should call onLogin method on submit click', function () {
		el.find('#submit').click();
		expect(scope.onLogin).toHaveBeenCalled();
	});
});