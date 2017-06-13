// (function(){	

// 	var app = angular.module("ContactApp");

// 	app.service("ContactDataSvc", function($http){		
// 		var service = {
// 			getContacts: getContacts,
// 			saveUser: saveUser,
// 			createUser: createUser
// 		}

// 		return service;
// 		//---------------------------------------------------
// 		function getContacts(){
// 			return $http.get('http://localhost:3000/contacts')
// 			.then(getContactSuccess)
// 			.catch(getContactFailed);

// 			function getContactSuccess(response){
// 				return response.data;
// 			}

// 			function getContactFailed(error){
// 				console.log('There was some error! ' + error.data);
// 			}
// 		}

// 		function saveUser(userData){
// 			return $http.put(
// 				"http://localhost:3000/contacts/" + userData.id,
// 			 	userData).then(function(response){
			 		
// 			 	})
// 		}

// 		function createUser(userData){
// 			return $http.post(
// 				"http://localhost:3000/contacts/", userData)
// 				.then(function(response){
// 			 		console.log(response);
// 			 	})
// 		}

// 	});
// })();