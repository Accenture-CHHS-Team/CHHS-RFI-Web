var React = require('react');

module.exports = React.createClass({

	render() {
		var items = this.props.messages.map(function(item, i) {
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