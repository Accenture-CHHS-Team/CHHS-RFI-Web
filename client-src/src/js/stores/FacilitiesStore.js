var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

// Thes Data
var data = {},
	facilitiesList = [],
	listPending = false;

// For now, use sample data
// facilitiesList = require('../../sampleData/ffas.json');

var FacilitiesStore = Object.assign({}, EventEmitter.prototype, {
	
	getList: function() {
		return facilitiesList;
	},
	
	getData: function() {
		return data;
	},

	isListPending: function() {
		return listPending;
	},

	getFacilityByNumber: function(number) {
		var facility,
			i = 0,
			l = facilitiesList.length;

		for(; i < l; i++) {
			if(facilitiesList[i].facility_number == number) {
				facility = facilitiesList[i];
				break;
			}
		}

		return facility;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'FACILITIES_LIST_PENDING':
				listPending = true;
				break;
			case 'GET_FACILITIES_LIST':
				listFromServer(action.data);
				break;
		}
		FacilitiesStore.emit('change');
	})
});

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function listFromServer(newData) {
	listPending = false;
	switch(typeof newData.result.facilities) {
		case 'undefined':
			facilitiesList = [];
			break;
		case 'string':
			facilitiesList = JSON.parse(newData.result.facilities);
			break;
		case 'object':
			facilitiesList = newData.result.facilities;
			break;
	}

	// Converst Facility names to title case
	facilitiesList.forEach(function(item) {
		item.facility_name = toTitleCase(item.facility_name);
		item.facility_type = toTitleCase(item.facility_type);
	});
}

module.exports = FacilitiesStore;