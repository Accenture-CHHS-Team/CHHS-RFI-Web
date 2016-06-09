var React = require('react');

module.exports = React.createClass({

	componentDidUpdate(prevProps, prevState) {
		// console.log('componentDidUpdate');
	    $(this.refs.list).stop(true).animate({ scrollTop: $(this.refs.list).height() }, 500);
	},

	render() {
		var items = this.props.messages.map(function(item, i) {
			return (
				<li key={i} className={item.sender}>
					<span className="sender">From: {item.sender}</span>
					<p>{item.text}</p>
				</li>
			);
		});
		return (
			<ul ref="list" className="messages-list">
				{items}
			</ul>
		)
	}

});