var React = require('react'),
	AppDispatcher = require('../dispatchers/AppDispatcher'),
	Link = require('react-router').Link,
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	CaseStore = require('../stores/CaseStore'),
	OptionsStore = require('../stores/OptionsStore'),
	OptionsActions = require('../actions/OptionsActions'),
	Hero = require('../components/Hero.jsx'),
	SelectionCarousel = require('../components/SelectionCarousel.jsx');

module.exports = React.createClass({
	
	getInitialState() {
		var state = this.getState();

		// Load the case information
		if(Object.getOwnPropertyNames(state.caseData).length === 0) {
			if(state.profile.CurrentCaseNumber) {
				CaseActions.getCase(state.profile.CurrentCaseNumber);
			}
			else {
				AppDispatcher.register(function(payload) {
					var action = payload.action;
					if(action.type === 'PROFILE_LOADED') {
						AppDispatcher.waitFor([ProfileStore.dispatcherId]);
						CaseActions.getCase(state.profile.CurrentCaseNumber);
					}
				});
			}
		}

		// Load the caseworker
		if(Object.getOwnPropertyNames(state.caseworker).length === 0) {
			// If we already have the profile loaded, go ahead and load facilities
			if(state.profile.CurrentCaseNumber) {
				FacilitiesActions.listByAddress(address);
			}
			// Else, wait for profile to be loaded
			else {
				AppDispatcher.register(function(payload) {
					var action = payload.action;
					if(action.type === 'PROFILE_LOADED') {
						AppDispatcher.waitFor([ProfileStore.dispatcherId]);
						FacilitiesActions.listByAddress(ProfileStore.getAddress());
					}
				});
			}
		}
	},

	getState() {
		var data = {
			profile: ProfileStore.getData(),
			caseData: CaseStore.getCaseData(ProfileStore.getData().CurrentCaseNumber),
			caseworker: CaseStore.getCaseWorkerData(CaseStore.getCaseData().id),
			child: ChildProfileStore.getData(),
			options: OptionsStore.getData()
		};

		data.heroData = {
			title: 'Hi ' + data.profile.FirstName + ',',
			bodyContent: '<p>Thank you for signing in to the Parent’s Caring Portal.</p><p>Since you know your home best, could you tell us a little bit about it? That will help us find the best place for ' + data.child.name + '.</p>'
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
		OptionsStore.on('change', this.binds.setState);
		ProfileStore.on('change', this.binds.setState);
	},

	componentWillUnmount() {
		// Remove Listeners
		OptionsStore.removeListener('change', this.binds.setState);
		ProfileStore.removeListener('change', this.binds.setState);
	},

	selectionsChanged(name, value) {
		OptionsActions.selectOption(name, value);
	},

	getOptions(key) {
		return typeof this.state.options[key] === 'object' ? this.state.options[key].options : [];
	},
	
	render() {
		return (
			<div>
				<Hero data={this.state.heroData} />
				<div className="container text-center">
					<SelectionCarousel 
						name="familyTypes"
						onChange={this.selectionsChanged}
						title="Family" 
						body="So we can match {this.state.child.name} to something familiar, can you describe how your home is organized?" 
						items={this.getOptions('familyTypes')} />
					<SelectionCarousel 
						name="bedTimes"
						onChange={this.selectionsChanged}
						title="Bed Times" 
						body="When does {this.state.child.name} go to bed?" 
						items={this.getOptions('bedTimes')} />
					<SelectionCarousel 
						name="dailyRoutines"
						onChange={this.selectionsChanged}
						title="Daily Routines" 
						body="What are some of {this.state.child.name} routines?" 
						items={this.getOptions('dailyRoutines')} />
					<p style={{marginTop: '2em', marginBottom: '2em'}}>
						<Link to="/ffa" className="btn btn-default">Next</Link>
					</p>
				</div>
			</div>
		)
	}
});