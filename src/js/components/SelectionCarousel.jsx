var React = require('React'),
	// Carousel = require('nuka-carousel');
	Carousel = require('react-slick');

module.exports = React.createClass({
	
	getInitialState() {
		return {
		};
	},

	render() {
		var items = this.props.items.map(function(item, i) {
			return (
				<div key={i} className={'item ' + item.style}>
					<div className="image"></div>
					<span class="title">{item.title}</span>
				</div>
			);
		});
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