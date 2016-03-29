
/* JavaScript content from js/controllers/mainPageCtrls/MP0201ViewCtrl.js in folder common */
/**
 * 手機裝置資訊
 */

app.controller('MP0201ViewCtrl', function($scope , $cordovaDevice) {
	
	$scope.device = $cordovaDevice.getDevice();

});