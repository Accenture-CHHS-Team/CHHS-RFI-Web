var React = require('react'),
	Link = require('react-router').Link,
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
			facilities: FacilitiesStore.getList(),
			address: ProfileStore.getAddress()
		};

		data.heroData = {
			title: !data.profile.FirstName ? '' : data.profile.FirstName + ',',
			bodyContent: !data.dependent.FirstName 
				? '' 
				: <div>There are many places that {data.dependent.FirstName} can stay:<br/>with a relative, in county homes, or in homes through a foster family agency. Your caseworker has recommended a foster family agency for {data.dependent.FirstName}. Here are examples of foster family agencies that are close to your location. <ChangeLocationLink aria-label="Change your location" address={data.address} onChange={this.handleNewAddress} /></div>
		}

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

	handleNewAddress: function(address) {
		ProfileActions.updateAddress(address);
		// Reload the facilities list
		FacilitiesActions.listByAddress(ProfileStore.getAddress());
	},

	render() {
		
		return (
			<div className="ffas">
				<Hero data={this.state.heroData} />
				<div className="container">
					<FacilitiesList facilities={this.state.facilities} />
				</div>
				<div className="footer">
					<div className="container text-right">
						<Link aria-label="Go Back" to="/onboarding" className="btn btn-link back">Go Back</Link> &nbsp;
						<Link aria-label="Next" to="/dashboard" className="btn btn-primary">Next</Link>
					</div>
				</div>
			</div>
		)
	}
});