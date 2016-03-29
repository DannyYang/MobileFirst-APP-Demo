
/* JavaScript content from js/app.js in folder common */
var app = angular.module('mlApp', ['ionic','angularMoment','ngCordova'])
	.run(function($ionicPlatform, $rootScope, NotificationService) {
      	$ionicPlatform.ready(function() {
        	if(window.StatusBar) {
          		StatusBar.styleDefault();
        	}
          // GCM & APNS註冊
        	NotificationService.registerDeviceToke();
		 });
    })
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		 $stateProvider.state('main', {
			 url : '/',
			 templateUrl : 'views/mainPage.html',
			 controller : 'mainPageCtrl'
		 })
		 .state('qrcode', {
			 url : '/qrcode',
			 templateUrl : 'views/mainPageViews/MPV0101.html',
			 controller : 'MP0101ViewCtrl'
		 })
		 .state('deviceInfo', {
			 url : '/deviceInfo',
			 templateUrl : 'views/mainPageViews/MPV0201.html',
			 controller : 'MP0201ViewCtrl'
		 })
		 .state('account', {
			 url : '/account',
			 templateUrl : 'views/mainPageViews/MPV0301.html',
			 controller : 'MP0301ViewCtrl'
		 })
		 .state('accountDetail', {
			 url : '/account/detail',
			 templateUrl : 'views/mainPageViews/MPV0302.html',
			 params: {"amt": null, "type": null, "details": null, "acct": null, "txDate": null, "id": null},
			 controller : 'MP0302ViewCtrl'
		 })
 		 .state('message', {
			 url : '/message',
			 templateUrl : 'views/mainPageViews/MPV0401.html',
			 controller : 'MP0401ViewCtrl'
		 });

		 $urlRouterProvider.otherwise('/');
		 
		 $ionicConfigProvider.backButton.previousTitleText(false).text('&emsp;&emsp;');
	});

function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
//	 WL.Client.connect({
//		 onSuccess: function(res) { console.log("connect success!")},
//		 onFailure: function(error) { console.log("connect fail!")}
//	 });
	 
	var env = WL.Client.getEnvironment();
    if(env === WL.Environment.IPHONE || env === WL.Environment.IPAD){
        document.body.classList.add('platform-ios'); 
        localStorage["DeviceType"] = "I";
    } else if(env === WL.Environment.ANDROID){
        document.body.classList.add('platform-android');
        localStorage["DeviceType"] = "A";
    }
}
