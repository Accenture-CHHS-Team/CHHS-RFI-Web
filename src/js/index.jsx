var React = require('react'),
	ReactDOM = require('react-dom'),
	AppDispatcher = require('./dispatchers/AppDispatcher'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	hashHistory = require('react-router').hashHistory,
	Login = require('./views/login.jsx'),
	Onboarding = require('./views/Onboarding.jsx'),
	Dashboard = require('./views/Dashboard.jsx');

// Render the app
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Login}/>
		<Route path="/onboarding" component={Onboarding}/>
		<Route path="/dashboard" component={Dashboard}/>
	</Router>,
	document.getElementById('app')
);