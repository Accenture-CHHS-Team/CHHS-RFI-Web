var React = require('react');

module.exports = React.createClass({
	getInitialState() {
	    return {
	    	value: this.props.value || ''
	    };
	},
	_onChange(event) {
		this.setState({
			value: event.target.value
		});
	},
	_onKeyDown(event) {
		// if (event.keyCode === 13) {
		// 	this._save();
		// }
	},
	_save(e) {
		if(e) e.preventDefault();
		this.props.onSave(this.state.value);
		this.setState({ value: '' });
	},
	render() {
		return (
			<form onSubmit={this._save}>
				<div className="row">
					<div className="col-xs-9 col-sm-10">
						<input aria-label="Enter your message here"
							type="text"
							value={this.state.value} 
							onChange={this._onChange} 
							className="form-control"
							placeholder="Type your message here" />
					</div>
					<div className="col-xs-3 col-sm-2">
						<button aria-label="Send your message" type="submit" className="btn btn-primary btn-block">Send</button>
					</div>
				</div>
			</form>
		);
	}
});
