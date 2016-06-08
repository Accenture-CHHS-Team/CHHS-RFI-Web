var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

var caseData = {},
	caseworker = {},
	loaded = false;

var CaseStore = Object.assign({}, EventEmitter.prototype, {
	getCaseData: function() {
		return caseData;
	},

	getCaseWorker: function() {
		return caseworker;
	},

	_updateCaseFromServer: function(data) {
		caseData = data;
	},

	_updateCaseWorkerFromServer: function(data) {
		caseworker = data;
	},

	dispatcherId: AppDispatcher.register(function(payload) {
		var action = payload.action;
		switch(action.type) {
			case 'GET_CASE':
				CaseStore._updateCaseFromServer(action.data);
				break;
			case 'GET_CASEWORKER':
				CaseStore._updateCaseWorkerFromServer(action.data);
				break;
		}
		CaseStore.emit('change');
	})
});

module.exports = CaseStore;