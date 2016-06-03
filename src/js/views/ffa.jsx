var React = require('React'),
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	Hero = require('../components/Hero.jsx');

module.exports = React.createClass({
	getInitialState() {
		var data = {
			profile: ProfileStore.getData(),
			child: ChildProfileStore.getData()
		};

		data.heroData = {
			title: 'Hi ' + data.profile.name + ',',
			bodyContent: '<p>There are many places that ' + data.child.name + ' can stay:</p><p>with a relative, in county homes, or in foster family agencies. For ' + data.child.name + ', your caseworker has recommended these foster agencies within 5 miles of your location. You can explore them below:</p>'
		};

		return data;
	},

	render() {
		return (
			<div>
				<Hero data={this.state.heroData} />
				<div className="container text-center">
					
				</div>
			</div>
		)
	}
});