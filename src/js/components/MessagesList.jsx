var React = require('React'),
	MessagesStore = require('../stores/MessagesStore');

module.exports = React.createClass({
	
	getInitialState() {
		return {
			messages: MessagesStore.getAll()
		};
	},

	render() {
		var items = this.state.messages.map(function(item, i) {
			return (
				<li key={i}>
					<span className="sender">From: {item.sender}</span>
					<p>{item.text}</p>
				</li>
			);
		});
		return (
			<div className="row">
				<div className="col-lg-12">
					<ul className="messages-list">
						{items}
					</ul>
				</div>
			</div>
		)
	}

});