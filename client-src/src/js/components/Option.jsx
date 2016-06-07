var React = require('react');

module.exports = React.createClass({
	render() {
		var classes = ['option', this.props.item.style];
		if(this.props.item.selected) {
			classes.push('selected');
		}

		return (
			<div data-value={this.props.item.value} className={classes.join(' ')} onClick={this.props.onSelect}>
				<div className="image"></div>
				<span className="title">{this.props.item.title}</span>
			</div>
		);
	}
});
