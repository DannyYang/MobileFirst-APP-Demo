/**
 * 手機裝置資訊
 */

app.controller('MP0201ViewCtrl', function($scope , $cordovaDevice) {
	
	$scope.device = $cordovaDevice.getDevice();

});