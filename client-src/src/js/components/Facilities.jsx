var React = require('react'),
	Link = require('react-router').Link,
	FacilitiesStore = require('../stores/FacilitiesStore');

var Facility = React.createClass({
	render() {
		return (
			<div className="facility">
				<div className="row">
					<div className="col-xs-4 col-sm-3">
						<div className="image" style={{backgroundImage: 'url("images/ffa-sample-' + ((this.props.index % 3) + 1) + '.png")'}}></div>
					</div>
					<div className="col-xs-6 col-sm-8 info">
						<h3>{this.props.item.facility_name}</h3>
						<p className="distance">Distance: {Math.round((this.props.item.location.distance * 0.000621371) * 100) / 100} miles away</p>
						<p>{this.props.item.facility_type}</p>
					</div>
					<div className="col-xs-2 col-sm-1 link-col text-center">
						<Link aria-label="View Facility" to={'/ffadetail/' + this.props.item.facility_number} className="link">View Facility</Link>
					</div>
				</div>
			</div>
		);
	}
});

var FacilitiesList = React.createClass({
	changeAddress(e) {
		e.preventDefault();
	},
	render() {
		var facilities = this.props.facilities.map(function(item, i) {
			return (
				<Facility key={i} index={i} item={item} />
			);
		}.bind(this));

		return (
			<div className="facilities">
				{
					FacilitiesStore.isListPending()
						? <p className="text-center loading">Loading...</p>
						: this.props.facilities.length === 0 
							? <p className="text-center no-results">No facilities found in your area. Try another address.</p>
							: facilities
				}
			</div>
		);
	}
});


module.exports = {
	Facility: Facility,
	FacilitiesList: FacilitiesList
};