var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

// Thes Data
var data = {};

// For now, use sample data
data = require('../../sampleData/ffas.json');

var FacilitiesStore = Object.assign({}, EventEmitter.prototype, {
	
	getData: function() {
		return data;
	},

	_listFromServer: function(newData) {
		data = newData;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'GET_FACILITIES_LIST':
				FacilitiesStore._listFromServer(action.data);
				break;
		}
		this.emit('change');
	}.bind(this))
});

module.exports = FacilitiesStore;