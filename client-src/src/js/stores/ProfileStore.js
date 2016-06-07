var SampleData = require('../../sampleData/profile-user.json');

var ProfileStore = {
	getData: function() {
		return SampleData;
	}
};

module.exports = ProfileStore;