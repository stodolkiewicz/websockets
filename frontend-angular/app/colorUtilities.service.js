(function(){

	var app = angular.module("myChat");

	app.service("ColorUtilitiesSvc", function(){

		var initialColor = "#BDF";

		var service = {
			returnColorIfOwnMessage: returnColorIfOwnMessage,
			initialColor: initialColor,
			setColorChooserAndColor: setColorChooserAndColor
		};

		return service;

		function returnColorIfOwnMessage(message, username, color){
			if(message.user == username){
				return color;
			}
		}


		function setColorChooserAndColor(selector, initialColor, color){
			var elem = document.querySelector(selector);
			var hueb = new Huebee( elem, {
			  setText: false
			});

			hueb.setColor(initialColor);
			return hueb;
		}
		
	});

})();