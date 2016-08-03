describe('Provider: inviteUser', function () {
	var inviteUserProvider,
		inviteUser;

	beforeEach(module('login-app', function (_inviteUserProvider_) {
		inviteUserProvider = _inviteUserProvider_;
	}));

	beforeEach(inject(function (_inviteUser_) {
		inviteUser = _inviteUser_;
	}));

	it('should correctly invite with default', function () {
		inviteUserProvider.configure(null);
		expect(inviteUser.getInvitation()).toBe('Hello my Dear guest! Log in, please.');
	});

	it('should correctly invite after configure', function () {
		inviteUserProvider.configure('Comrade');
		expect(inviteUser.getInvitation()).toBe('Hello my Dear Comrade! Log in, please.');
	});

	it('should correctly configure invitation after app start', function () {
		expect(inviteUser.getInvitation()).toMatch(/^Hello my Dear [a-z]+! Log in, please\.$/i);
	});
});