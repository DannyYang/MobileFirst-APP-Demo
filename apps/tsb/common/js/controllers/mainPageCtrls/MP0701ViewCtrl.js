app.controller('MP0701ViewCtrl', function($scope, $ionicLoading, $cordovaDevice, APIService) {
	
	$scope.openApp = function() {
		console.log("openApp!");
		if(WL.Client.getEnvironment() == WL.Environment.IPHONE) {
			cordova.exec(function(){
					console.log("success");
				}, 
				function(){
					console.log("fail");
				},
				"AppToAppPlugin","START",
				[
					"appid", 
					"您即將離開「目前APP」，是否確定切換至『元富行動達人』？", 
					"callerName", 
					"touchstockmls",
					"https://itunes.apple.com/tw/app/yuan-fu-zheng-quan-xing-dong/id600217687?l=zh&mt=8",				  
				]
			);
		} else {
			cordova.exec(function(){
					console.log("success");
				}, 
				function(){
					console.log("fail");
				},
				"AppToAppPlugin","START",
				[
					"appid", 
					"您即將離開「目前APP」，是否確定切換至『元富行動達人』？", 
					"caller", 
					"com.mitake.mls",
					"com.mitake.mls.MyMitake",
					"https://play.google.com/store/apps/details?id=com.mitake.mls"								  
				]
			);
		}
	};
});
