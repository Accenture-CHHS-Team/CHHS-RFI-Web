// AppController
var AppController = (function() {
	
	function App(options) {
		this.options = Object.assign({
			// Defaults
		}, options);
	}

	App.prototype.start = function() {
		
	};

	return App;
})();


// Start App
$(function() {
	window.app = new AppController();
	window.app.start();
});
