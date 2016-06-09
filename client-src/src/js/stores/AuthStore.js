var ApiConstants = require('../constants/ApiConstants'),
	EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

var AuthStore = Object.assign({}, EventEmitter.prototype, {
	
	jwt: null,
	claim: null,

	login: function() {
		// Timeout to simulate login call...
		setTimeout(function() {
			// We should get a JWT here
			AuthStore.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEifQ.ivJ5P23wqVo3w31flg3aOu7er--Ijght_RrBf_MuqsU';
			AuthStore.claim = AuthStore.parseJwt();
			localStorage.setItem('jwt', AuthStore.jwt);
			this.emit('change');
		}.bind(this), 1000);
	},

	logout: function() {
		AuthStore.jwt = null;
		AuthStore.claim = null;
		localStorage.removeItem('jwt');
		this.emit('change');
	},

	loggedIn: function() {
		return AuthStore.claim !== null;
	},

	parseJwt () {
		if(AuthStore.jwt === null) { return null; }
		return JSON.parse(atob(AuthStore.jwt.split('.')[1]));
	},

	userId: function() {
		return AuthStore.claim.id;
	}

});

// Try to init with local storage
AuthStore.jwt = localStorage.getItem('jwt');
AuthStore.claim = AuthStore.parseJwt();

module.exports = AuthStore;