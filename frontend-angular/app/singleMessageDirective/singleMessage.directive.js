(function(){

	angular
		.module('myChat')
		.directive('singleMessage', singleMessage);

		function singleMessage(){
			var directive = {
				restrict: 'E',
				templateUrl: 'singleMessageDirective/singleMessage.html',
				scope: {
					message: "=",
					color: "@"
				},
				controller: controller,
				controllerAs: 'vm',
				bindToController: true
			};

			return directive;

			function controller($scope){
				var vm = this;

				$scope.$watch(function(){return vm.color}, function(){
					vm.colorStyle = {
						"background-color": vm.color
					}
				})
			
			}
		}

})();