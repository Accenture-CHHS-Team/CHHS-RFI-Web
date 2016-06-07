var MessagesStore = require('../stores/MessagesStore'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var MessageActions = {
	create: function(text) {
		// Dispatch the action
		AppDispatcher.dispatch({
			action: {
				type: 'MESSAGE_CREATED',
				text: text
			}
		});

		// Server call here...

		// Then, dispatch update event
		// AppDispatcher.dispatch({
		// 	action: {
		// 		type: 'MESSAGES_SERVER_UPDATE',
		// 		data: data
		// 	}
		// });
	}
};

module.exports = MessageActions;