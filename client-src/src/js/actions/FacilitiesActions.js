var ApiConstants = require('../constants/ApiConstants'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var FacilitiesActions = {

	getList: function() {
		var promise = $.ajax(ApiConstants.BASEURL + 'Facilities/list')
			.then(function(data) {
				AppDispatcher.dispatch({
					action: {
						type: 'GET_FACILITIES_LIST',
						data: data
					}
				})
			});
		AppDispatcher.dispatch({
			action: {
				type: 'FACILITIES_LIST_PENDING',
				promise: promise
			}
		});
	},

	listByAddress: function(address, radius) {
		var data = {};
		data.radius = radius || 6000;

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

		// Make call
		var promise = $.ajax({
			url: ApiConstants.BASEURL + 'Facilities/listByAddress',
			type: "POST",
			data: data
		})
		.then(function(data) {
			AppDispatcher.dispatch({
				action: {
					type: 'GET_FACILITIES_LIST',
					data: data
				}
			})
		});

		AppDispatcher.dispatch({
			action: {
				type: 'FACILITIES_LIST_PENDING',
				promise: promise
			}
		});
	}
};

module.exports = FacilitiesActions;
