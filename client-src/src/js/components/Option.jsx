var React = require('react');

module.exports = React.createClass({
	onKeyDown : function(o, u, e){		
		// select on space-down (ARIA requirement)		
		if(o.keyCode === 32){
			o.stopPropagation();
			o.preventDefault();
			e.stopPropagation();
			e.preventDefault();
			this.props.onSelect(o);						
			return false;
		}
	},
	render() {
		var classes = ['option', this.props.item.style];
		if(this.props.item.selected) {
			classes.push('selected');
		}
		
		return (
			<div role="button" tabIndex='3' data-value={this.props.item.value} className={classes.join(' ')} onKeyDown={this.onKeyDown} onClick={this.props.onSelect}>
				<div className="image"></div>
				<span className="title">{this.props.item.title}</span>
			</div>
		);
	}
});
