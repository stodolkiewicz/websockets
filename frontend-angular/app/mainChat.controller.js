(function(){

	angular
		.module('myChat')
	    .controller('mainChatController', mainChatController);

	function mainChatController($scope){
		var vm = this;
		vm.connected = false;
		vm.stompClient = null;
		vm.socket = null;
		vm.greetingResponses = [];

		vm.sendName = function(){
			vm.stompClient.send("/app/hello", {}, JSON.stringify({"name": vm.username}) );
		}

		vm.setConnected = function(connected){
			vm.connected = connected;
		}

		vm.connect = function(){
			vm.socket = new SockJS('http://localhost:8080/chat-websocket-enpoint');
			console.log(vm.socket);
			vm.stompClient = Stomp.over(vm.socket);

			vm.stompClient.connect({}, function(frame){
				$scope.$apply(function(){
					vm.setConnected(true);
				})

				vm.stompClient.subscribe('/topic/greetings', function(greetingResponse){
					
					vm.greetingResponses.push(JSON.parse(greetingResponse.body).content);
					console.log(vm.greetingResponses[vm.greetingResponses.length - 1]);

				});
				
			});

			vm.socket.onclose = function (err) { 
				console.log("CLOSE", err);
				$scope.$apply(function(){
					vm.setConnected(true);
				})
			};
		}


		vm.disconnect = function(){
			vm.stompClient.disconnect();
			vm.setConnected(false);	
		}


	}

})();