var React = require('react');

var LocationForm = React.createClass({
	getDefaultProps() {
		return {
			address: {
				streetAddress: '',
				city: '',
				state: '',
				zip: ''
			}
		};
	},

	getInitialState() {
		return {
			address: {
				streetAddress: this.props.address.streetAddress,
				city: this.props.address.city,
				state: this.props.address.state,
				zip: this.props.address.zip
			}
		};
	},

	componentWillReceiveProps(nextProps) {
		this.setState({address: nextProps.address});
	},

	handleChange(e) {
		var el = e.target,
			name = el.getAttribute('name'),
			value = el.value;
		this.state.address[name] = value;
		this.setState(this.state);
	},

	handleSubmit(e) {
		e.preventDefault();
		this.props.onChange(this.state.address);
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input aria-label="Address" onChange={this.handleChange} type="text" className="form-control" placeholder="Address" name="streetAddress" value={this.state.address.streetAddress} />
				</div>
				<div className="form-group">
					<input aria-label="City" onChange={this.handleChange} type="text" className="form-control" placeholder="City" name="city" value={this.state.address.city} />
				</div>
				<div className="form-group row">
					<div className="col-xs-6">
						<input aria-label="State" onChange={this.handleChange} type="text" className="form-control" placeholder="State" name="state" value={this.state.address.state} />
					</div>
					<div className="col-xs-6">
						<input aria-label="Zip Code" onChange={this.handleChange} type="text" className="form-control" placeholder="Zip" name="zip" value={this.state.address.zip} />
					</div>
				</div>
				<button role="button" aria-label="Change your search address" type="submit" className="btn btn-primary btn-block">Update</button>
			</form>
		);
	}
});

module.exports = React.createClass({
	getDefaultProps() {
		return {
			address: {},
			text: 'Use a Different Address',
			onChange: function() {}
		};
	},

	componentDidMount() {
		var el = this.refs.wrapper,
			link = this.refs.link,
			content = $(el).find('.content');

		$(() => {
			$('[data-toggle="popover"]').popover({
				html: true,
				content: (el) => content,
				placement: 'bottom'
			}).on('hidden.bs.popover', function () {
				$(el).append(content);
			});
		});
	},

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);  
	},

	handleChange(newAddress) {
		$(this.refs.link).popover('hide');
		this.props.onChange(newAddress);
	},

	render() {
		return (
			<span ref="wrapper">
				<a ref="link" tabIndex='5' aria-label='Opens a form to change your address' className="change-location" data-toggle="popover">{this.props.text}</a>
				<span className="content"><LocationForm onChange={this.handleChange} address={this.props.address} /></span>
			</span>
		);
	}
});
