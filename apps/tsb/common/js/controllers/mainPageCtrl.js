/**
 * 
 */

app.controller('mainPageCtrl', function($scope, $state) {

	$scope.badge = 15;
		
	$scope.go = function(goName) {
		$state.go(goName);
	}
})