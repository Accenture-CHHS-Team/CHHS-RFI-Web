var React = require('React');

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
					<div className="col-xs-10">
						<input 
							type="text"
							value={this.state.value} 
							onChange={this._onChange} 
							className="form-control" />
					</div>
					<div className="col-xs-2">
						<button type="submit" className="btn btn-default btn-block">Send</button>
					</div>
				</div>
			</form>
		);
	}
});
