var React = require('React'),
	AppDispatcher = require('../dispatchers/AppDispatcher'),
	Link = require('react-router').Link,
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	OptionsStore = require('../stores/OptionsStore'),
	OptionsActions = require('../actions/OptionsActions'),
	Hero = require('../components/Hero.jsx'),
	SelectionCarousel = require('../components/SelectionCarousel.jsx');

module.exports = React.createClass({
	
	getInitialState() {
		var data = {
			profile: ProfileStore.getData(),
			child: ChildProfileStore.getData(),
			options: OptionsStore.getData()
		};

		data.heroData = {
			title: 'Hi ' + data.profile.name + ',',
			bodyContent: '<p>Thank you for signing in to the Parent’s Caring Portal.</p><p>Since you know your home best, could you tell us a little bit about it? That will help us find the best place for ' + data.child.name + '.</p>'
		};

		return data;
	},

	componentDidMount() {
		OptionsStore.on('change', function() {
			this.setState({
				options: OptionsStore.getData()
			});
		}.bind(this));
	},

	componentWillUnmount() {
		OptionsStore.removeListener('change');
	},

	selectionsChanged(name, value) {
		OptionsActions.selectOption(name, value);
	},

	getOptions(key) {
		return typeof this.state.options[key] === 'object' ? this.state.options[key] : [];
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