var SampleData = require('../../sampleData/options.json');

var OptionsStore = {
	getData: function() {
		return SampleData;
	}
};

module.exports = OptionsStore;