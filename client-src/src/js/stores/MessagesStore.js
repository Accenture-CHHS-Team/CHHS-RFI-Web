var data = require('../../sampleData/messages.json'),
	EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

function ISODateString(d){
	var pad = n => n < 10 ? '0' + n : n;
	return d.getUTCFullYear() + '-'
		+ pad(d.getUTCMonth() + 1) + '-'
		+ pad(d.getUTCDate()) + 'T'
		+ pad(d.getUTCHours()) + ':'
		+ pad(d.getUTCMinutes()) + ':'
		+ pad(d.getUTCSeconds()) + 'Z';
}

var MessagesStore = Object.assign({}, EventEmitter.prototype, {
	getAll: function() {
		return data;
	},

	create: function(text) {
		data.push({
			'sender': 'Me',
			'text': text,
			'date': ISODateString(new Date())
		});
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'MESSAGE_CREATED':
				MessagesStore.create(action.text);
				break;
		}
		MessagesStore.emit('change');
	})
});

module.exports = MessagesStore;