var React = require('React'),
	Link = require('react-router').Link;

module.exports = React.createClass({
	render() {
		return (
			<header id="main-head">
				<div className="container">
					<h1 id="logo">Parent's Caring Portal</h1>
					<nav>
						<Link to="/dashboard">My Account</Link>
					</nav>
				</div>
			</header>
		);
	}
});
