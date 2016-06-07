var SampleData = require('../../sampleData/profile-child.json');

var ChildProfileStore = {
	getData: function() {
		return SampleData;
	}
};

module.exports = ChildProfileStore;