var React = require('react'),
	AppDispatcher = require('../dispatchers/AppDispatcher'),
	Link = require('react-router').Link,
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	CaseStore = require('../stores/CaseStore'),
	CaseActions = require('../actions/CaseActions'),
	OptionsStore = require('../stores/OptionsStore'),
	OptionsActions = require('../actions/OptionsActions'),
	Hero = require('../components/Hero.jsx'),
	SelectionCarousel = require('../components/SelectionCarousel.jsx');

module.exports = React.createClass({
	
	getInitialState() {
		var state = this.getState();
		return state;
	},

	getState() {
		var data = {
			profile: ProfileStore.getData(),
			caseData: CaseStore.getCaseData(ProfileStore.getData().CurrentCaseNumber),
			caseworker: CaseStore.getCaseWorkerData(CaseStore.getCaseData().id),
			dependent: CaseStore.getDependentData(CaseStore.getCaseData().id),
			options: OptionsStore.getData()
		};

		data.heroData = {
			title: !data.profile.FirstName ? '' : 'Hi ' + data.profile.FirstName + ',',
			bodyContent: !data.dependent.FirstName ? '' : '<p>Thank you for signing in to the Parent’s Caring Portal.</p><p>Since you know your home best, could you tell us a little bit about it? That will help us find the best place for ' + data.dependent.FirstName + '.</p>'
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
		CaseStore.on('change', this.binds.setState);
	},

	componentWillUnmount() {
		// Remove Listeners
		OptionsStore.removeListener('change', this.binds.setState);
		ProfileStore.removeListener('change', this.binds.setState);
		CaseStore.removeListener('change', this.binds.setState);
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
						body={!this.state.dependent.FirstName ? '' : 'So we can match ' + this.state.dependent.FirstName + ' to something familiar, can you describe how your home is organized?'} 
						items={this.getOptions('familyTypes')} />
					<SelectionCarousel 
						name="bedTimes"
						onChange={this.selectionsChanged}
						title="Bed Times" 
						body={!this.state.dependent.FirstName ? '' : 'When does ' + this.state.dependent.FirstName + ' go to bed?'}
						items={this.getOptions('bedTimes')} />
					<SelectionCarousel 
						name="dailyRoutines"
						onChange={this.selectionsChanged}
						title="Daily Routines" 
						body={!this.state.dependent.FirstName ? '' : 'What are some of ' + this.state.dependent.FirstName + ' routines?'} 
						items={this.getOptions('dailyRoutines')} />
					<p style={{marginTop: '2em', marginBottom: '2em'}}>
						<Link to="/ffa" className="btn btn-default">Next</Link>
					</p>
				</div>
			</div>
		)
	}
});