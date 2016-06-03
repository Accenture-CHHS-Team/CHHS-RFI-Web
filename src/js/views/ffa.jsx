var React = require('React'),
	Link = require('react-router').Link,
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	FacilitiesStore = require('../stores/FacilitiesStore'),
	Hero = require('../components/Hero.jsx');

module.exports = React.createClass({
	getInitialState() {
		var data = {
			profile: ProfileStore.getData(),
			child: ChildProfileStore.getData(),
			facilities: FacilitiesStore.getData()
		};

		data.heroData = {
			title: data.profile.name + ',',
			bodyContent: '<p>There are many places that ' + data.child.name + ' can stay:<br/>with a relative, in county homes, or in foster family agencies. For ' + data.child.name + ', your caseworker has recommended these foster agencies within 5 miles of your location. You can explore them below:</p>'
		};

		return data;
	},

	render() {
		var facilities = this.state.facilities.map(function(item, i) {
			return (
				<div key={i} className="facility">
					<div className="row">
						<div className="col-xs-3 image">

						</div>
						<div className="col-xs-8 info">
							<h3>{item.name}</h3>
							<span className="distance">{item.distance}</span>
							<p>{item.description}</p>
						</div>
						<div className="col-xs-1 link-col text-center">
							<Link to="/" className="link">View Facility</Link>
						</div>
					</div>
				</div>
			);
		}.bind(this));
		return (
			<div>
				<Hero data={this.state.heroData} />
				<div className="container facilities">
					{facilities}
				</div>
				<p className="text-center" style={{marginTop: '2em', marginBottom: '2em'}}>
					<Link to="/" className="btn btn-default">Go Back</Link> 
					<Link to="/dashboard" className="btn btn-primary">Next</Link>
				</p>
			</div>
		)
	}
});