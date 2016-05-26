var React = require('React'),
	Link = require('react-router').Link,
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore');

module.exports = React.createClass({
	getInitialState() {
		return {
			profile: ProfileStore.getData(),
			child: ChildProfileStore.getData()
		};
	},
	render() {
		return (
			<div className="container text-center">
				<h1>Hi {this.state.profile.name}!</h1>
				<h4>Thank you for signing in to the Parent's Caring Portal.</h4>
				<h4>{this.state.child.name} is in good care and is safe.</h4>
				<Link to="/dashboard" className="btn btn-default">Next &rarr;</Link>
			</div>
		)
	}
});