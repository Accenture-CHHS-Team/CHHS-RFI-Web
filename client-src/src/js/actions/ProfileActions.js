var ApiConstants = require('../constants/ApiConstants'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var ProfileActions = {
	load: function(id) {
		return $.ajax(ApiConstants.BASEURL + 'Identities/' + id)
			.then(function(data) {
				AppDispatcher.dispatch({
					action: {
						type: 'PROFILE_LOADED',
						data: data
					}
				});
			}.bind(this));
	},

	updateAddress: function(newAddress) {
		AppDispatcher.dispatch({
			action: {
				type: 'PROFILE_ADDRESS_UPDATED',
				data: newAddress
			}
		});
	}
};

module.exports = ProfileActions;