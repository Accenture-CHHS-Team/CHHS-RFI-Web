var React = require('react'),
	Link = require('react-router').Link;

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var Facility = React.createClass({
	render() {
		return (
			<div className="facility">
				<div className="row">
					<div className="col-xs-3">
						<div className="image"></div>
					</div>
					<div className="col-xs-8 info">
						<h3>{toTitleCase(this.props.item.facility_name)}</h3>
						<span className="distance">Capacity: {this.props.item.facility_capacity}</span>
						<p>{toTitleCase(this.props.item.facility_type)}</p>
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