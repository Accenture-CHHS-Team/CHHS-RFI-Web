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
					type: 'GET_CASE',
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
					type: 'GET_CASEWORKER',
					data: data
				}
			});
		})
	}
};

module.exports = CaseActions;