var ApiConstants = require('../constants/ApiConstants'),
	EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

var data = {},
	loaded = false,
	profileId;

var ProfileStore = Object.assign({}, EventEmitter.prototype, {
	load: function(id) {
		return $.ajax(ApiConstants.BASEURL + 'Identities/' + id)
			.then(function(profile) {
				data = profile;
				profileId = profile.id;
				loaded = true;
				this.emit('change');
			}.bind(this));
	},

	getData: function() {
		return data;
	},

	loaded: function() {
		return loaded;
	}
});

module.exports = ProfileStore;