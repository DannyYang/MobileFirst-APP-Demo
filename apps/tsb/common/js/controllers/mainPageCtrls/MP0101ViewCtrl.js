/**
 * QRcode頁面Controller
 */
app.controller('MP0101ViewCtrl', function($scope,$ionicPopup,$cordovaInAppBrowser) {
	
	$scope.scanQRCode = function() {
		cordova.exec(function(result){
			var resultText = result.text;
			if(resultText.startsWith("http") || resultText.startsWith("https") ) {
				$cordovaInAppBrowser.open(resultText, '_blank', {});
			} else {
				$ionicPopup.alert({title : "掃描結果",content : resultText});
			}
		}, function(error) {
			console.log(error);
		}, 'BarcodeScanner', 'scan', []);
	};
	
});