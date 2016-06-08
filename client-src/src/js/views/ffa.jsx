var React = require('react'),
	Link = require('react-router').Link,
	AppDispatcher = require('../dispatchers/AppDispatcher'),
	ProfileStore = require('../stores/ProfileStore'),
	CaseStore = require('../stores/CaseStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	FacilitiesStore = require('../stores/FacilitiesStore'),
	FacilitiesActions = require('../actions/FacilitiesActions'),
	Hero = require('../components/Hero.jsx'),
	FacilitiesList = require('../components/Facilities.jsx').FacilitiesList;

module.exports = React.createClass({
	getInitialState() {
		var state = this.getState();

		// Get facilities list if we need it
		if(state.facilities.length === 0) {
			var address = ProfileStore.getAddress();
			// If we already have the address, go ahead and load facilities
			if(address) {
				FacilitiesActions.listByAddress(address);
			}
			// Else, wait for profile to be loaded
			else {
				AppDispatcher.register(function(payload) {
					var action = payload.action;
					if(action.type === 'PROFILE_LOADED') {
						AppDispatcher.waitFor([ProfileStore.dispatcherId]);
						setTimeout(() => { FacilitiesActions.listByAddress(ProfileStore.getAddress()); }, 1);
					}
				});
			}
		}

		return state;
	},

	getState() {
		var data = {
			profile: ProfileStore.getData(),
			dependent: CaseStore.getDependentData(),
			facilities: FacilitiesStore.getList()
		};

		data.heroData = {
			title: !data.profile.FirstName ? '' : data.profile.FirstName + ',',
			bodyContent: !data.dependent.FirstName ? '' : '<p>There are many places that ' + data.dependent.FirstName + ' can stay:<br/>with a relative, in county homes, or in foster family agencies. For ' + data.dependent.FirstName + ', your caseworker has recommended these foster agencies within 5 miles of your location. You can explore them below:</p>'
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

		// Get facilities list
		// FacilitiesActions.getListByRadius();

		// Try geocoding the user's address
	},

	componentWillUnmount() {
		// Remove Listeners
		ProfileStore.removeListener('change', this.binds.setState);
		FacilitiesStore.removeListener('change', this.binds.setState);
	},

	render() {
		
		return (
			<div>
				<Hero data={this.state.heroData} />
				<div className="container">
					<FacilitiesList facilities={this.state.facilities} />
				</div>
				<p className="text-center" style={{marginTop: '2em', marginBottom: '2em'}}>
					<Link to="/onboarding" className="btn btn-default">Go Back</Link> &nbsp;
					<Link to="/dashboard" className="btn btn-primary">Next</Link>
				</p>
			</div>
		)
	}
});