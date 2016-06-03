var React = require('React'),
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
				<div key={i} 
					data-value={item.value} 
					className={'item ' + item.style + (item.selected ? ' selected' : '')} 
					onClick={this.handleSelection}>
					<div className="image"></div>
					<span class="title">{item.title}</span>
				</div>
			);
		}.bind(this));
		var settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1
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