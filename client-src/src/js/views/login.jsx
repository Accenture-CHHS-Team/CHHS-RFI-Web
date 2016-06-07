var React = require('react'),
	AuthStore = require('../stores/AuthStore'),
	ProfileStore = require('../stores/ProfileStore'),
	browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({

	componentDidMount() {
	    AuthStore.on('change', this.checkLogin);

	    // Go ahead an log out if we hit this page
	    AuthStore.logout();
	},

	componentWillUnmount() {
	    AuthStore.removeListener('change', this.checkLogin);
	},

	checkLogin() {
		if(AuthStore.loggedIn()) {
			ProfileStore.load(AuthStore.userId()).then(function() {
				window.location = '/#' + '/';
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
						<form className="col-lg-8 col-lg-push-2 form-horizontal" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label className="control-label col-sm-4" for="childFirstName">Child's First Name</label>
								<div className="col-sm-8">
									<input id="childFirstName" className="form-control" placeholder="Child's First Name" />
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
								<div class="col-sm-offset-4 col-sm-8">
									<button type="submit" className="btn btn-default">login</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}

});