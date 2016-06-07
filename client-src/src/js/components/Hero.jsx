var React = require('React');

module.exports = React.createClass({
	
	createMarkup() {
		return {__html: this.props.data.bodyContent}
	},

	render() {
		return (
			<div className="hero">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-8 col-sm-push-2">
							<h2>{this.props.data.title}</h2>
							<div dangerouslySetInnerHTML={this.createMarkup()} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
