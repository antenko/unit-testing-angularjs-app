describe('InviteUser Provider', function () {
	var InviteUserProvider,
		InviteUser;

	beforeEach(function() {
		module('login-app', function(_InviteUserProvider_) {
			InviteUserProvider = _InviteUserProvider_;
		});
	});

	beforeEach(inject(function(_InviteUser_) {
		InviteUser = _InviteUser_;
	}));

	it('should correctly invite with default', function () {
		InviteUserProvider.configure(null);
		expect(InviteUser.getInvitation()).toBe('Hello my Dear guest! Log in, please.');
	});

	it('should correctly invite after configure', function () {
		InviteUserProvider.configure('Comrade');
		expect(InviteUser.getInvitation()).toBe('Hello my Dear Comrade! Log in, please.');
	});

	it('should correctly configure invitation after app start', function () {
		expect(InviteUser.getInvitation()).toMatch(/^Hello my Dear [a-z]+! Log in, please\.$/i);
	});
});