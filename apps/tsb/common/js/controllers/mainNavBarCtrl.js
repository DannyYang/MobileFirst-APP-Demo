/**
 * 
 */

app.controller('mainNavBarCtrl', function($scope, $rootScope, $state, ModalService) {
	
	$scope.login = function() {
		ModalService.show('views/loginModal.html', 'LoginModalCtrl');
	};
	
	/*切換header背景顏色*/
    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
        if (toState.name == 'main' ) {
          $rootScope.isMainPage = true;
        } else {
          $rootScope.isMainPage = false;
        }
    });  
})