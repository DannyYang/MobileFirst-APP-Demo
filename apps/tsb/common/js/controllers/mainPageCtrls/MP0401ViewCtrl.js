/**
 * 聊天介面 Controller
 */

app.controller('MP0401ViewCtrl', function($scope, $state, $timeout, $ionicPopup, APIService) {
	
	$scope.data = {};
	
	$scope.data.userName = "test";
	
	if(localStorage["userName"]) {
		$scope.data.userName = localStorage["userName"];
	}
	
	$scope.send = function () {
		var param = {
			"sid" : $scope.data.userName,
			"rid" : $scope.data.rid,
			"msg" : $scope.data.msg
		};
		console.log(param);

		APIService.sendNotification(param).then(function(res){
			$ionicPopup.alert({title : "提示",content : "發送成功!"});
		},function(error){
			console.log(error);
			alert(JSON.stringify(error));
		});
			
	}
});