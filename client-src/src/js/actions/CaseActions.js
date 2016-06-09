var ApiConstants = require('../constants/ApiConstants'),
	AppDispatcher = require('../dispatchers/AppDispatcher');

var CaseActions = {
	getCase: function(caseNumber) {
		$.ajax({
			url: ApiConstants.BASEURL + 'Cases',
			data: {
				'filter[where][CaseNumber]': caseNumber
			}
		})
		.then(function(data) {
			AppDispatcher.dispatch({
				action: {
					type: 'CASE_LOADED',
					data: data
				}
			});
		})
	},
	
	getCaseWorker: function(caseId) {
		$.ajax({
			url: ApiConstants.BASEURL + 'Cases/' + caseId + '/caseworkers'
		})
		.then(function(data) {
			AppDispatcher.dispatch({
				action: {
					type: 'CASEWORKER_LOADED',
					data: data
				}
			});
		})
	},

	getDependent: function(caseId) {
		$.ajax({
			url: ApiConstants.BASEURL + 'Cases/' + caseId + '/dependents'
		})
		.then(function(data) {
			AppDispatcher.dispatch({
				action: {
					type: 'DEPENDENT_LOADED',
					data: data
				}
			});
		})
	}
};

module.exports = CaseActions;