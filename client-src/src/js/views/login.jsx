var React = require('react'),
	AuthStore = require('../stores/AuthStore'),
	ProfileActions = require('../actions/ProfileActions'),
	browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({

	componentDidMount() {
	    AuthStore.on('change', this.checkLogin);

	    // Go ahead an log out if we hit this page
	    // Timeout to give parent classes time to register AuthStore callbacks
	    setTimeout(() => { AuthStore.logout(); }, 0);
	},

	componentWillUnmount() {
	    AuthStore.removeListener('change', this.checkLogin);
	},

	checkLogin() {
		if(AuthStore.loggedIn()) {
			ProfileActions.load(AuthStore.userId()).then(function() {
				window.location = '/#' + '/onboarding';
			});
		}
	},
	
	handleSubmit(event) {
		event.preventDefault();
		var userName = event.target.elements[0].value;
		// browserHistory.push(path);

		// Disable form
		$('button[type="submit"]').prop('disabled', true);

		// Login
		AuthStore.login();
	},
	
	render() {
		return (
			<div className="login">
				<div className="container text-center">
					<h1>Sign in to your parent portal</h1>
					<div className="row">
						<form className="col-xs-8 col-xs-push-2 form-horizontal" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label className="control-label col-sm-4" for="childFirstName">Case Number</label>
								<div className="col-sm-8">
									<input id="childFirstName" className="form-control" placeholder="Case Number" />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-4" for="childFirstName">Child's Last Name</label>
								<div className="col-sm-8">
									<input id="childLastName" className="form-control" placeholder="Child's Last Name" />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-4" for="childFirstName">Child's Date of Birth</label>
								<div className="col-sm-8">
									<div className="row">
										<div className="col-xs-4"><input id="childDOBMonth" className="form-control" placeholder="MM" /></div>
										<div className="col-xs-4"><input id="childDOBDay" className="form-control" placeholder="DD" /></div>
										<div className="col-xs-4"><input id="childDOBYear" className="form-control" placeholder="YY" /></div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-4 col-sm-8 text-left">
									<button type="submit" className="btn btn-primary btn-login">Go</button>
									<p style={{marginTop: '2em'}}><em>For demonstration purposes, no login information is required. Click go to continue.</em></p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}

});