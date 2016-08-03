describe('App: login-app', function () {
	var inviteUser;

	beforeEach(module('login-app'));
	beforeEach(inject(['inviteUser', function (_inviteUser_) {
		inviteUser = _inviteUser_;
	}]));

	it('should configure inviteUser provider', function () {
		expect(inviteUser.getInvitation()).toMatch(/.+(friend|visitor).+/i);
	});
});