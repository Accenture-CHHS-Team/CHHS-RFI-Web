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

	_updateFromServer: function(newData) {
		data = newData;
		this.emit('change');
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'FACILITIES_SERVER_UPDATE':
				FacilitiesStore._updateFromServer(action.data);
				break;
		}
	}.bind(this))
});

module.exports = FacilitiesStore;