var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

// Thes Data
var data = {};

// For now, use sample data
data = require('../../sampleData/options.json');

var OptionsStore = Object.assign({}, EventEmitter.prototype, {
	
	getData: function() {
		return data;
	},

	getSelectedByKey: function(key) {
		var selected = [];
		for(var i = 0, l = data[key].length; i < l; i++) {
			if(data[key][i].selected) {
				selected.push(data[key][i]);
			}
		}

		return selected;
	},

	_toggleOption: function(key, value) {
		
		// Make sure it's an existing key
		if(data[key] === 'undefined') return false;

		for(var i = 0, l = data[key].length; i < l; i++) {
			// Should only one be selected?
			data[key][i].selected = false;

			// If it's the one 
			if (data[key][i].value === value) {
				data[key][i].selected = data[key][i].selected ? false : true;
			}
		}

		this.emit('change');
	},

	_updateFromServer: function(newData) {
		data = newData;
		this.emit('change');
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'OPTION_CHANGED':
				OptionsStore._toggleOption(action.key, action.value);
				break;
			case 'OPTIONS_SERVER_UPDATE':
				OptionsStore._updateFromServer(action.data);
				break;
		}
	}.bind(this))
});

module.exports = OptionsStore;