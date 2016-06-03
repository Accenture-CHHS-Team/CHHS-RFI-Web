var OptionsStore = require('../stores/OptionsStore'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var OptionsActions = {
	selectOption: function(key, value) {
		// Dispatch the action
		AppDispatcher.dispatch({
			action: {
				type: 'OPTION_CHANGED',
				key: key,
				value: value
			}
		});

		// Server call here...

		// Then, dispatch update event
		// AppDispatcher.dispatch({
		// 	action: {
		// 		type: 'OPTIONS_SERVER_UPDATE',
		// 		data: data
		// 	}
		// });
	}
};

module.exports = OptionsActions;