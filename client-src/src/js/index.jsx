var React = require('react'),
	ReactDOM = require('react-dom'),
	AppDispatcher = require('./dispatchers/AppDispatcher'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	hashHistory = require('react-router').hashHistory,
	Login = require('./views/login.jsx'),
	Onboarding = require('./views/onboarding.jsx'),
	Dashboard = require('./views/dashboard.jsx'),
	FFAPage = require('./views/ffa.jsx'),
	Header = require('./components/Header.jsx');

// Render the app
ReactDOM.render(
	<div>
		<Header />
		<Router history={hashHistory}>
			<Route path="/login" component={Login} />
			<Route path="/" component={Onboarding} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/ffa" component={FFAPage} />
		</Router>
	</div>,
	document.getElementById('app')
);