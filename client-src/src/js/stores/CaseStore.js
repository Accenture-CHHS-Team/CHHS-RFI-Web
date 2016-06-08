var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

var caseData = {},
	caseworker = {},
	dependent = {},
	loaded = false;

var CaseStore = Object.assign({}, EventEmitter.prototype, {
	getCaseData: function() {
		return caseData;
	},

	getCaseWorkerData: function() {
		return caseworker;
	},

	getDependentData: function() {
		return dependent;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'CASE_LOADED':
				updateCaseFromServer(action.data);
				break;
			case 'CASEWORKER_LOADED':
				updateCaseWorkerFromServer(action.data);
				break;
			case 'DEPENDENT_LOADED':
				updateDependentFromServer(action.data);
				break;
		}
		CaseStore.emit('change');
	})
});

function updateCaseFromServer(data) {
	caseData = data.length > 0 ? data[0] : {};
}

function updateCaseWorkerFromServer(data) {
	caseworker = data.length > 0 ? data[0] : {};
}

function updateDependentFromServer(data) {
	dependent = data.length > 0 ? data[0] : {};
}

module.exports = CaseStore;