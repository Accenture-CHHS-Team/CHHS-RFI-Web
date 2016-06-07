var OptionsStore = require('./OptionsStore'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var selections = {};

var SelectionsStore = {
	getData: function() {
		return selections;
	}
};

module.exports = SelectionsStore;