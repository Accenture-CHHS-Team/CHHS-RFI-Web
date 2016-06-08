var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

var data = {},
	loaded = false,
	profileId;

var ProfileStore = Object.assign({}, EventEmitter.prototype, {

	getData: function() {
		return data;
	},

	getAddress: function() {
		if(typeof data.postalAddresses === 'object' && data.postalAddresses.length > 0) {
			return data.postalAddresses[0];
		}

		return false;
	},

	loaded: function() {
		return loaded;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'PROFILE_LOADED':
				loadFromServer(action.data);
				break;
		}
		ProfileStore.emit('change');
	})
});

// Handle incomnig data from server
function loadFromServer(profile) {
	loaded = true;
	data = profile;
}

module.exports = ProfileStore;
