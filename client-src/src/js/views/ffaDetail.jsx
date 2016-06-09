var React = require('react'),
	Link = require('react-router').Link,
	RouterContext = require('react-router').RouterContext,
	AppDispatcher = require('../dispatchers/AppDispatcher'),
	ProfileStore = require('../stores/ProfileStore'),
	ProfileActions = require('../actions/ProfileActions'),
	CaseStore = require('../stores/CaseStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	FacilitiesStore = require('../stores/FacilitiesStore'),
	FacilitiesActions = require('../actions/FacilitiesActions'),
	Hero = require('../components/Hero.jsx'),
	FacilitiesList = require('../components/Facilities.jsx').FacilitiesList,
	ChangeLocationLink = require('../components/ChangeLocationLink.jsx');

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	getInitialState() {
		var state = this.getState();
		return state;
	},

	getState() {
		var data = {
			profile: ProfileStore.getData(),
			dependent: CaseStore.getDependentData(),
			facilities: FacilitiesStore.getList(),
			address: ProfileStore.getAddress(),
			facility: FacilitiesStore.getFacilityByNumber(this.props.params.number)
		};

		if( ! data.facility) {
			window.location = '/#/ffa';
		}

		data.heroData = {
			title: !data.profile.FirstName ? '' : data.profile.FirstName + ',',
			bodyContent: !data.dependent.FirstName 
				? '' 
				: <div>There are many places that {data.dependent.FirstName} can stay:<br/>with a relative, in county homes, or in foster family agencies. For {data.dependent.FirstName}, your caseworker has recommended these foster agencies within 5 miles of <ChangeLocationLink address={data.address} onChange={this.handleNewAddress} />. You can explore them below:</div>
		};

		return data;
	},

	componentDidMount() {
		// Bind event functions so that we can remove them later
		this.binds = {
			setState: function() {
				this.setState(this.getState());
			}.bind(this)
		};

		// Add listeners
		ProfileStore.on('change', this.binds.setState);
		FacilitiesStore.on('change', this.binds.setState);
	},

	componentWillUnmount() {
		// Remove Listeners
		ProfileStore.removeListener('change', this.binds.setState);
		FacilitiesStore.removeListener('change', this.binds.setState);
	},

	goBack(e) {
		e.preventDefault();
		this.context.router.goBack()
	},

	render() {
		return (
			<div className="facility-detail">
				<div className="container">
					<a href="#" onClick={this.goBack} className="back">Back</a>
					<h2>{this.state.facility.facility_name}</h2>
				</div>
				<div className="hero-image"></div>
				<div className="container">
					<h4>Contact Details</h4>
					<p>
						{this.state.facility.facility_address} <br/>
						{this.state.facility.facility_city}, {this.state.facility.facility_state}<br/>
						{this.state.facility.facility_zip} <br/>
						<a aria-label="Open this location in Google Maps" href={'http://maps.google.com/?q=' + this.state.facility.facility_address + ', ' + this.state.facility.facility_city+ ', ' + this.state.facility.facility_state + ', ' + this.state.facility.facility_zip} targe="_blank">Open in Maps</a>
					</p>
					<h4>Phone Number</h4>
					<p>
						{this.state.facility.facility_telephone_number}
					</p>						
				</div>
			</div>
		)
	}
});