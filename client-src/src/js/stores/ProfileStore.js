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

		var address = {
			streetAddress: '',
			city: '',
			state: '',
			zip: ''
		};

		address = false;

		if(typeof data.postalAddresses === 'object' && data.postalAddresses.length > 0) {
			return this.convertAddress(data.postalAddresses[0]);
		}
		else {
			return false;
		}
	},

	loaded: function() {
		return loaded;
	},

	// Convert address from the format it comes in from profile to a more digestable format
	convertAddress: function(address) {
		var data = {};
		// Copy keys, and convert address if needed
		['streetAddress', 'city', 'state', 'zip'].forEach(function(val) {
			if(address[val]) {
				data[val] = address[val];
			}
		});
		if(address.AddressLine1) {
			data.streetAddress = address.AddressLine1;
			// delete data.AddressLine1;
		}
		if(address.City) {
			data.city = address.City;
			// delete data.City;
		}
		if(address.State) {
			data.state = address.State;
			// delete data.City;
		}
		if(address.PostalCode) {
			data.zip = address.PostalCode;
			// delete data.PostalCode;
		}

		return data;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'PROFILE_LOADED':
				loadFromServer(action.data);
				break;
			case 'PROFILE_ADDRESS_UPDATED':
				updateProfileAddress(action.data);
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

function updateProfileAddress(address) {
	data.postalAddresses = [address];
}

module.exports = ProfileStore;
