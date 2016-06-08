var React = require('react'),
	Option = require('../components/Option.jsx'),
	Carousel = require('react-slick');

module.exports = React.createClass({
	
	getDefaultProps() {
		return {
			onChange: function() {},
			items: [],
			name: ''
		};
	},

	handleSelection(e) {
		var value = e.currentTarget.getAttribute('data-value');
		this.props.onChange(this.props.name, value);
	},

	render() {
		var items = this.props.items.map(function(item, i) {
			return (
				<div key={i}>
					<Option item={item} onSelect={this.handleSelection} />
				</div>
			);
		}.bind(this));
		var settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}
			]
		};
		return (
			<div className="selection-carousel text-left">
				<h2>{this.props.title}</h2>
				<p>{this.props.body}</p>
				<div className="row">
					<Carousel {...settings}>
						{items}
					</Carousel>
				</div>
			</div>
		)
	}

});