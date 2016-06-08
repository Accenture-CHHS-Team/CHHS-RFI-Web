var React = require('react'),
	ExecutionEnvironment = require('react/node_modules/fbjs/lib/ExecutionEnvironment'),
	Link = require('react-router').Link,
	AppDispatcher = require('../dispatchers/AppDispatcher'),
	ProfileStore = require('../stores/ProfileStore'),
	ChildProfileStore = require('../stores/ChildProfileStore'),
	OptionsStore = require('../stores/OptionsStore'),
	Option = require('../components/Option.jsx'),
	ChatBox = require('../components/ChatBox.jsx'),
	FacilitiesActions = require('../actions/FacilitiesActions'),
	FacilitiesStore = require('../stores/FacilitiesStore'),
	FacilitiesList = require('../components/Facilities.jsx').FacilitiesList,
	StickyContainer = require('react-sticky').StickyContainer,
	Sticky = require('react-sticky').Sticky,
	CaseStore = require('../stores/CaseStore'),
	CaseActions = require('../actions/CaseActions');

module.exports = React.createClass({
	getState() {
		var data = {
			showNotification: true,
			child: ChildProfileStore.getData(),
			options: OptionsStore.getData(),
			facilities: FacilitiesStore.getList(),
			familyTypes: OptionsStore.getSelectedByKey('familyTypes'),
			bedTimes: OptionsStore.getSelectedByKey('bedTimes'),
			dailyRoutines: OptionsStore.getSelectedByKey('dailyRoutines'),
			caseworker: CaseStore.getCaseWorker()
		};

		// Try to load the case worker
		// var profile = ProfileStore.getData();
		// if(Object.getOwnPropertyNames(data.caseworker).length === 0 && profile.CurrentCaseNumber) {
		// 	CaseActions.getCaseWorker(profile.CurrentCaseNumber);
		// }

		// Test getting case
		// if(ProfileStore.getData().CurrentCaseNumber) {
		// 	CaseActions.getCase(ProfileStore.getData().CurrentCaseNumber);
		// }

		return data;
	},

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
						FacilitiesActions.listByAddress(ProfileStore.getAddress());
					}
				});
			}
		}

		return state;
	},

	updateState() {
		var state = this.getState();
		this.setState(state);
	},

	componentDidMount() {
		// If we can use the dom, watch scrolling
	    if (ExecutionEnvironment.canUseDOM) {
			document.addEventListener('scroll', this.handleScroll);
			// Fire scroll for the first time
			this.handleScroll();
		}

		// Add listeners
		ProfileStore.on('change', this.updateState);
		CaseStore.on('change', this.updateState);
	},

	componentWillUnmount() {
		document.removeEventListener('scroll', this.handleScroll);
		ProfileStore.removeListener('change', this.updateState);
		CaseStore.removeListener('change', this.updateState);
	},

	handleScroll(e) {
		// Find first nav section above the fold
		var sections = $('section'),
			i = 0,
			l = sections.length,
			scroll = $(window).scrollTop(),
			current,
			section,
			offset;
		for(; i < l; i++) {
			section = sections[i];
			offset = $(section).offset().top + ($(section).height() * .8);	// Nav should switch when it's 80% throuth the section
			if(offset - scroll > 0) {
				// Found it!
				current = section;
				break;
			}
		}
		if(current) {
			$('nav a').removeClass('selected');
			$('nav a[href="#' + $(current).attr('id') + '"]').addClass('selected');
		}
	},

	hideNotification(e) {
		e.preventDefault();
		this.setState({
			showNotification: false
		});
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
			}.bind(this)),

			notifications = this.state.showNotification ? (
				<div className="row">
					<div className="col-xs-12 notification">
						<p>Welcome to your caring dashboard. Here you can suggest comforts for {this.state.child.name} and also chat with your caseworker.</p>
						<a href="#" className="close" onClick={this.hideNotification}>Close</a>
					</div>
				</div>
				) : '';
		
		return (
			<StickyContainer className="dashboard container">
				<div className="row">
					<div className="col-xs-12">
						{notifications}
						<Sticky>
							<nav className="row text-center">
								<a href="#your-family" className="col-xs-4">Your family</a>
								<a href="#facilities" className="col-xs-4">Foster care</a>
								<a href="#chat" className="col-xs-4">Chat with your caseworker</a>
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
						</section>
					</div>
				</div>
			</StickyContainer>
		)
	}
});