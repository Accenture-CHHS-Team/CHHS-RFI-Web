var ApiConstants = require('../constants/ApiConstants'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var FacilitiesActions = {
	getList: function() {
		$.ajax(ApiConstants.BASEURL + 'Facilities/list')
			.then(function(data) {
				AppDispatcher.dispatch({
					action: {
						type: 'GET_FACILITIES_LIST',
						data: data
					}
				})
			});
	},
	getListByRadius: function(lat, lng, radius) {
		$.ajax({
			url: ApiConstants.BASEURL + 'Facilities/listByRadius',
			data: {
				lat: lat,
				long: lng,
				radius: radius || 5
			}
		})
		.then(function(data) {
			AppDispatcher.dispatch({
				action: {
					type: 'GET_FACILITIES_LIST',
					data: data
				}
			})
		});
	}
};

module.exports = FacilitiesActions;