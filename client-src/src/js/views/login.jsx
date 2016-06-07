var React = require('react'),
	browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({
	
	handleSubmit(event) {
		event.preventDefault();
		var userName = event.target.elements[0].value,
			path = '/onboarding';
		// browserHistory.push(path);
		window.location = '/#' + path;
	},
	
	render() {
		return (
			<div className="container text-center">
				<h1>Welcome!</h1>
				<h4>Please Login</h4>
				<div className="row">
					<form className="col-lg-6 col-lg-push-3" onSubmit={this.handleSubmit}>
						<div className="form-group row">
							<label className="sr-only" for="username">Username</label>
							<input id="username" className="form-control" placeholder="Username" />
						</div>
						<button type="submit" className="btn btn-primary">login</button>
					</form>
				</div>
			</div>
		)
	}

});