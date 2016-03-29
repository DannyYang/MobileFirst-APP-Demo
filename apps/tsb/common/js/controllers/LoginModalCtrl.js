/**
 * 登入頁面 Controller
 */
app.controller('LoginModalCtrl', function($scope, APIService, $cordovaDevice, $ionicPopup) {
	$scope.data.userName = "";
	
	if(localStorage["userName"]) {
		$scope.data.userName = localStorage["userName"];
	}
	
	$scope.register = function(){
		var param = {
			"uid" : $scope.data.userName,
			"deviceType" : localStorage["DeviceType"],
			"deviceToken" : localStorage["DeviceToken"],
			"uuid" : $cordovaDevice.getUUID()
		};
		
		if(param.uid && param.deviceType && param.deviceToken && param.uuid) {
			APIService.registerNotification(param).then(function(res){
				$ionicPopup.alert({title : "提示",content : "註冊成功!"});
				localStorage["userName"] = $scope.data.userName;
			},function(error){
				console.log(error);
				alert(JSON.stringify(error));
			});
		}
	};
	
	$scope.unRegister = function(){
		var param = {
			"uuid" : $cordovaDevice.getUUID()
		};
		if(param.uuid) {
			APIService.unRegisterNotification(param).then(function(res){
				$ionicPopup.alert({title : "提示",content : "取消推播通知成功!"});
			},function(error){
				console.log(error);
				alert(JSON.stringify(error));
			});
		}
	};
	
	$scope.testSend = function() {
		// 測試發給自己
		var param = {
			"sid" : "myself",
			"rid" : $scope.data.userName,
			"msg" : "hihi"
		};

    	if(param.rid) {
			APIService.sendNotification(param).then(function(res){
				console.log(res);
			},function(error){
				console.log(error);
				alert(JSON.stringify(error));
			});
		}
	};
});