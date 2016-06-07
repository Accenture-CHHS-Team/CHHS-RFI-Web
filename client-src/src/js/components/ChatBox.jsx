var React = require('react'),
	MessagesStore = require('../stores/MessagesStore'),
	MessageInput = require('./MessageInput.jsx'),
	MessageList = require('./MessagesList.jsx'),
	MessageActions = require('../actions/MessageActions');

module.exports = React.createClass({
	getInitialState() {
	    return this._getState();
	},
	_getState() {
		return {
	    	messages: MessagesStore.getAll()
	    };
	},
	componentDidMount() {
		// Bind event functions so that we can remove them later
		this.binds = {
			messagesStoreChanged: function() {
				this.setState(this._getState());
			}.bind(this)
		}

		// Add listeners
		MessagesStore.on('change', this.binds.messagesStoreChanged);
	},
	componentWillUnmount() {
		// Remove Listeners
		MessagesStore.removeListener('change', this.binds.messagesStoreChanged);
	},
	newMessage(text) {
		MessageActions.create(text); 
	},
	render() {
		return (
			<div class="chat">
				<MessageList messages={this.state.messages} />
				<MessageInput onSave={this.newMessage} />
			</div>
		);
	}
});
