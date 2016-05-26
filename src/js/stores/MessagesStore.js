var SampleData = require('../../sampleData/messages.json');

var MessagesStore = {
	getAll: function() {
		return SampleData;
	}
};

module.exports = MessagesStore;