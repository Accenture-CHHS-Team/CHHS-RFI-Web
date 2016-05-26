var React = require('React'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	MessagesList = require('../components/MessagesList.jsx');

module.exports = React.createClass({
	getInitialState() {
		return {
			child: ChildProfileStore.getData()
		};
	},
	render() {
		return (
			<div className="container text-center">
				<div className="row">
					<div className="col-lg-6 col-lg-push-3">
						<h4>Welcome to your caring dashboard. Here you can suggest comforts for {this.state.child.name} and also chat with your caseworker</h4>
						<div className="messages">
							<h5>Messages</h5>
							<MessagesList/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});