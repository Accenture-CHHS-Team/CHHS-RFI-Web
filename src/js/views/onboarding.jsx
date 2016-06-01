var React = require('React'),
	Link = require('react-router').Link,
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	OptionsStore = require('../stores/OptionsStore'),
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
	render() {
		return (
			<div>
				<Hero data={this.state.heroData} />
				<div className="container text-center">
					<SelectionCarousel title="Family" body="So we can match {this.state.child.name} to something familiar, can you describe how your home is organized?" items={this.state.options.familyTypes} />
					<SelectionCarousel title="Bed Times" body="When does {this.state.child.name} go to bed?" items={this.state.options.bedTimes} />
					<SelectionCarousel title="Daily Routines" body="What are some of {this.state.child.name} routines?" items={this.state.options.dailyRoutines} />
					<p style={{marginTop: '2em', marginBottom: '2em'}}>
						<Link to="/ffa" className="btn btn-default">Next</Link>
					</p>
				</div>
			</div>
		)
	}
});