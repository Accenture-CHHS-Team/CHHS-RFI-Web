var React = require('react'),
	ReactDOM = require('react-dom'),
	AppDispatcher = require('./dispatchers/AppDispatcher'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	IndexRoute = require('react-router').IndexRoute,
	hashHistory = require('react-router').hashHistory,
	AuthStore = require('./stores/AuthStore'),
	ProfileActions = require('./actions/ProfileActions'),
	Login = require('./views/login.jsx'),
	Onboarding = require('./views/onboarding.jsx'),
	Dashboard = require('./views/dashboard.jsx'),
	FFAPage = require('./views/ffa.jsx'),
	Header = require('./components/Header.jsx');

// Main App container
var App = React.createClass({
	componentDidMount() {
	    // Load the profile if we're logged in
	    if(AuthStore.loggedIn()) {
	    	ProfileActions.load(AuthStore.userId());
	    }
	},

	render() {
		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		)
	}
});

// Check to make sure user is logged in before allowing access
function requireAuth(nextState, replace) {
	if( ! AuthStore.loggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

// Render the app
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Onboarding} />
			<Route path="/login" component={Login} />
			<Route path="/logout" component={Login} />
			<Route path="/" component={Onboarding} onEnter={requireAuth} />
			<Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
			<Route path="/ffa" component={FFAPage} onEnter={requireAuth} />
		</Route>
	</Router>,
	document.getElementById('app')
);