
/* JavaScript content from js/services/APIService.js in folder common */
/**
 * 定義APP所需要用到的所有Service
 */

app.factory('APIService', function ($http) {
	var serviceContextRoot = "http://140.124.183.164:8080/PushServer";
//	var serviceContextRoot = "http://10.1.3.76:8080/PushServer";
	var accountService = "http://140.124.183.164:8080/Demo/DepositDetails";
	
    return {
    	// 與Server註冊推播通知
    	registerNotification : function(paramObj) {
    		var requestURL = serviceContextRoot + "/register";
    		return $http.post(requestURL,paramObj).then(function(response){
    			return response;
    		});
    	},
    	// 與Server取消註冊推播通知
    	unRegisterNotification : function(paramObj) {
    		var requestURL = serviceContextRoot + "/unRegister";
    		return $http.post(requestURL,paramObj).then(function(response){
    			return response;
    		});
    	},
    	// 發送特定User推播通知
    	sendNotification : function(paramObj) {
    		var requestURL = serviceContextRoot + "/doPush";
    		return $http.post(requestURL,paramObj).then(function(response){
    			return response;
    		});
    	},
    	// 取得帳戶資訊
    	getDataList : function() {
    		return $http.get(accountService).then(function(response){
    			return response;
    		});
    	}
    }
});