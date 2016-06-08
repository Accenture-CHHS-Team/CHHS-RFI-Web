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

	handleNewAddress: function(address) {
		ProfileActions.updateAddress(address);
		// Reload the facilities list
		FacilitiesActions.listByAddress(ProfileStore.getAddress());
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