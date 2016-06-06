var React = require('React'),
	Link = require('react-router').Link,
	ChildProfileStore = require('../stores/ChildProfileStore'),
	OptionsStore = require('../stores/OptionsStore'),
	Option = require('../components/Option.jsx'),
	ChatBox = require('../components/ChatBox.jsx'),
	FacilitiesStore = require('../stores/FacilitiesStore'),
	FacilitiesList = require('../components/Facilities.jsx').FacilitiesList,
	StickyContainer = require('react-sticky').StickyContainer,
	Sticky = require('react-sticky').Sticky;

module.exports = React.createClass({
	getInitialState() {
		return {
			child: ChildProfileStore.getData(),
			options: OptionsStore.getData(),
			facilities: FacilitiesStore.getData(),
			familyTypes: OptionsStore.getSelectedByKey('familyTypes'),
			bedTimes: OptionsStore.getSelectedByKey('bedTimes'),
			dailyRoutines: OptionsStore.getSelectedByKey('dailyRoutines')
		};
	},
	render() {
		var types = Object.keys(this.state.options),
			selected = [],
			options = types.map(function(key, i) {
				var selectedOptions = [];
				selected = OptionsStore.getSelectedByKey(key);
				if(selected.length > 0) {
					selectedOptions = selected.map(function(item, i) {
						return <Option key={i} item={item} />
					});
				}
				else {
					selectedOptions = (<span>Not selected</span>);
				}
				return (
					<div key={i} className="col-xs-4">
						<h4>{this.state.options[key].title}</h4>
						{selectedOptions}
					</div>
				);
			}.bind(this));
		
		return (
			<StickyContainer className="dashboard container">
				<div className="row">
					<div className="col-xs-12">
						<div className="row">
							<div className="col-xs-12 notification">
								Welcome to your caring dashboard. Here you can suggest comforts for {this.state.child.name} and also chat with your caseworker
							</div>
						</div>
						<Sticky>
							<nav className="row text-center">
								<a href="#" className="col-xs-4 selected">Your family</a>
								<a href="#" className="col-xs-4">Foster care</a>
								<a href="#" className="col-xs-4">Chat with your caseworker</a>
							</nav>
						</Sticky>

						<section id="your-family" className="row">
							<div className="col-xs-12">
								<p>You know your house best. By updating this list, you can help Jaden find a place that is familiar. Here’s what you’ve said so far:</p>
								<div className="row">
									{options}
								</div>
								<div className="row">
									<div className="col-xs-12 footer text-right">
										<Link to="/" className="btn btn-primary">Make Updates</Link>
									</div>
								</div>
							</div>
						</section>

						<section id="facilities" className="row">
							<div className="col-xs-12">
								<FacilitiesList facilities={this.state.facilities} />
							</div>
						</section>

						<section id="chat" className="row">
							<div className="col-xs-12">
								<div className="row">
									<div className="col-xs-4 info">
										<h4>Lisa Lee</h4>
										<p>You can send Lisa a message and she will get back to you as soon as possible.</p>
										<hr/>
										<p>To contact your caseworker you may also call:</p>
										<p>(916) 874-3100 or <br/>(209) 744-0499</p>
										<p>For emergencies dial 9-1-1 </p>
									</div>
									<div className="col-xs-8 conversation">
										<ChatBox />
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</StickyContainer>
		)
	}
});