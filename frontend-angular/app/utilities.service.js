(function(){
	var app = angular.module("myChat")

	app.service("UtilitiesSvc", function(){
		var service = {
			scrollToBottom: scrollToBottom,
			inputTextAreaNotEmpty: inputTextAreaNotEmpty,
			sendMessageByEnter: sendMessageByEnter
		}

		return service;

		function scrollToBottom(selector){
			$(selector).animate({ scrollTop: $(selector).prop("scrollHeight")}, 500);
		}

		function sendMessageByEnter(event, message){
			if(event.key == "Enter"){
				if(inputTextAreaNotEmpty(message)){
					vm.sendMessage();
				}	
			}
		}

		function inputTextAreaNotEmpty(message){
			if(message == null || message == ""){
				return false;
			}else{
				return true;
			}
		}

	})

})();