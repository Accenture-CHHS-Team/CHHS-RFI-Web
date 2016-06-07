var React = require('react'),
	Link = require('react-router').Link;

module.exports = React.createClass({
	render() {
		return (
			<header id="main-head">
				<div className="container">
					<h1 id="logo">Parents Caring Portal</h1>
					<nav>
						<Link to="/login">Sign Out</Link>
					</nav>
				</div>
			</header>
		);
	}
});
