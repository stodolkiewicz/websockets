(function(){

	var app = angular.module("myChat");

	app.service("WebsocketsSvc", function(UtilitiesSvc, $rootScope){

		var websocketUrl = 'http://localhost:8080/chat-websocket-endpoint';
		var subscribeAllEndpoint = '/chat/all';
		var selectorScrollDown = "#message-area";

		var stompClient = getStompClient(websocketUrl);
		var greetingResponses = [];

		var service = {
			websocketUrl: websocketUrl,
			stompClient: stompClient,
			greetingResponses: greetingResponses,

			connectAll: connectAll	
		}

		return service;

		function getStompClient(websocketUrl){
			var socket = new SockJS(websocketUrl);
			return Stomp.over(socket);
		}

		function connectAll(){
			var stompClient = getStompClient(websocketUrl);

			stompClient.connect({}, function(frame){	
				stompClient.subscribe(subscribeAllEndpoint, function(greetingResponse){
					var messageReceivedFromServer = JSON.parse(greetingResponse.body);
					greetingResponses.push(messageReceivedFromServer);
					
					$rootScope.$apply();

					UtilitiesSvc.scrollToBottom(selectorScrollDown);	
				});

			});
			return stompClient;
		}



	});
})();