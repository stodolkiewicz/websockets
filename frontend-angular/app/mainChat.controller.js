(function(){

	angular
		.module('myChat')
	    .controller('mainChatController', mainChatController);

	function mainChatController($scope, UtilitiesSvc, ColorUtilitiesSvc, WebsocketsSvc){
		var vm = this;
		vm.connected = false;
		vm.stompClient = null;
		vm.socket = null;
		vm.WebsocketsSvc = WebsocketsSvc;
		vm.color = ColorUtilitiesSvc.initialColor;
		vm.connectedToOneself = false;
	
	    $(window).on('load',function(){
        	$('#myModal').modal('show');
    	});

	    vm.showModal = function(value){
	    	if(value == true){
	    		$('#myModal').modal('show');
	    	}else if(value == false){
	    		$('#myModal').modal('hide');
	    	}
	    }
		vm.sendMessageAll = function(){
			vm.stompClient.send("/app/hello", {}, JSON.stringify({"user": vm.username, "message": vm.message}) );
			vm.message = "";
		}

		vm.sendMessageByEnterAll = function(event){
			if(event.key == "Enter"){
				if(UtilitiesSvc.inputTextAreaNotEmpty(vm.message)){
					vm.sendMessageAll();
				}	
			}
		}

		vm.connectAll = function(){
			vm.stompClient = WebsocketsSvc.connectAll();
			$('#myModal').modal('hide');		
			vm.connected = true;
		}

		vm.connectToUser = function(){
			console.log("--------------------------CONNECTED ---------------------------");
			
				var socket = new SockJS('http://localhost:8080/chat-websocket-endpoint');
				vm.stompClient = Stomp.over(socket);

				vm.stompClient.connect({}, function(frame){	
					vm.stompClient.subscribe('/chat/' + vm.username, function(greetingResponse){
						var ownMessage = JSON.parse(greetingResponse.body);
						console.log("Own Message");
						console.log(ownMessage);	
						connectedToOneself = true;
					});


					vm.stompClient.subscribe('/chat/' + vm.userToConnectTo, function(greetingResponse){
						var userToConnectToMessage = JSON.parse(greetingResponse.body);
						console.log("userToConnectToMessage" + userToConnectToMessage);	
					});

				});
			
			return vm.stompClient;
		}

		vm.sendMessageToUser = function(userToSendMessageTo){
			vm.stompClient.send("/app/pm/" + userToSendMessageTo, {}, 
				JSON.stringify(
					{"user": vm.username, "message": vm.messageToUser}
					)); 
			
			vm.message = "";
		}

		






		vm.disconnectAll = function(){
			vm.stompClient.disconnect();
			vm.connected = false;	
		}

// ---------------  Color code -----------------------------------
	    var colorChooserElement = ColorUtilitiesSvc.setColorChooserAndColor(
	    	'#color-chooser', "#BDF", vm.color);

		colorChooserElement.on( 'change', function( color, hue, sat, lum ) {
		 	$scope.$apply(function(){
		 		vm.color = color;
		  	});
		})

		vm.returnColorIfOwnMessage = function(message){
			return ColorUtilitiesSvc.returnColorIfOwnMessage(message, vm.username, vm.color);
		}





	}

})();