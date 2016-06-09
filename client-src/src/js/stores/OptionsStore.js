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
		var selected = [],
			options = data[key].options,
			i = 0, 
			l = options.length;
		for(var i = 0, l = options.length; i < l; i++) {
			if(typeof options[i].selected === 'boolean' && options[i].selected === true) {
				selected.push(options[i]);
			}
		}

		return selected;
	},

	_toggleOption: function(key, value) {
		
		// Make sure it's an existing key
		if(data[key] === 'undefined') return false;

		var options = data[key].options,
			i = 0, 
			l = options.length;

		for(; i < l; i++) {
			// Should only one be selected?
			options[i].selected = false;

			// If it's the one 
			if (options[i].value === value) {
				options[i].selected = options[i].selected ? false : true;
			}
		}
	},

	_updateFromServer: function(newData) {
		data = newData;
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
		OptionsStore.emit('change');
	})
});

module.exports = OptionsStore;