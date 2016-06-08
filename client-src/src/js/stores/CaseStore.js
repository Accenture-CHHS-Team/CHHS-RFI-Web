var EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatchers/AppDispatcher');

var caseData = {},
	caseworker = {},
	loaded = false;

var CaseStore = Object.assign({}, EventEmitter.prototype, {
	getCaseData: function() {
		return caseData;
	},

	getCaseWorkerData: function() {
		return caseworker;
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
		}
		CaseStore.emit('change');
	})
});

function updateCaseFromServer(data) {
	caseData = data;
},

function updateCaseWorkerFromServer(data) {
	caseworker = data;
},

module.exports = CaseStore;