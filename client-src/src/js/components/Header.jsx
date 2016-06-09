var React = require('react'),
	Link = require('react-router').Link;

module.exports = React.createClass({
	render() {
		return (
			<header id="main-head">
				<div className="container">
					<h1 id="logo">Parents Caring Portal</h1>
					<nav>
						{
							this.props.loggedIn
								? <a href="#/logout" role="button" tabIndex="0" >Sign Out</a>
								: <span>&nbsp;</span>
						}
					</nav>
				</div>
			</header>
		);
	}
});
