var React = require('React'),
	Link = require('react-router').Link;

var Facility = React.createClass({
	render() {
		return (
			<div className="facility">
				<div className="row">
					<div className="col-xs-3">
						<div className="image"></div>
					</div>
					<div className="col-xs-8 info">
						<h3>{this.props.item.name}</h3>
						<span className="distance">{this.props.item.distance}</span>
						<p>{this.props.item.description}</p>
					</div>
					<div className="col-xs-1 link-col text-center">
						<Link to="/" className="link">View Facility</Link>
					</div>
				</div>
			</div>
		);
	}
});

var FacilitiesList = React.createClass({
	render() {
		var facilities = this.props.facilities.map(function(item, i) {
			return (
				<Facility key={i} item={item} />
			);
		}.bind(this));

		return (
			<div className="facilities">
				{facilities}
			</div>
		);
	}
});


module.exports = {
	Facility: Facility,
	FacilitiesList: FacilitiesList
};