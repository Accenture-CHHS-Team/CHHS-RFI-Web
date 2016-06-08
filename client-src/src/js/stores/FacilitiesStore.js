var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

// Thes Data
var data = {},
	facilitiesList = [];

// For now, use sample data
// facilitiesList = require('../../sampleData/ffas.json');

var FacilitiesStore = Object.assign({}, EventEmitter.prototype, {
	
	getList: function() {
		return facilitiesList;
	},
	
	getData: function() {
		return data;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'GET_FACILITIES_LIST':
				listFromServer(action.data);
				break;
		}
		FacilitiesStore.emit('change');
	})
});

function listFromServer(newData) {
	facilitiesList = JSON.parse(newData.result.facilities);
	console.log(facilitiesList);
}

module.exports = FacilitiesStore;