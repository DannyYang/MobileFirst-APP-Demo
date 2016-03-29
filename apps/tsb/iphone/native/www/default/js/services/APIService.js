
/* JavaScript content from js/services/APIService.js in folder common */
/**
 * 定義APP所需要用到的所有Service
 */

app.factory('APIService', function($http, $cordovaFileTransfer, $ionicLoading) {
    var serviceContextRoot = "http://140.124.183.164:8080/PushServer";
    //  var serviceContextRoot = "http://10.1.3.76:8080/PushServer";
    var accountService = "http://140.124.183.164:8080/Demo/DepositDetails";

    var serverURL = "http://140.124.183.164:8080/ServletFileUploadSample/upload";

    return {
        // 與Server註冊推播通知
        registerNotification: function(paramObj) {
            var requestURL = serviceContextRoot + "/register";
            return $http.post(requestURL, paramObj).then(function(response) {
                return response;
            });
        },
        // 與Server取消註冊推播通知
        unRegisterNotification: function(paramObj) {
            var requestURL = serviceContextRoot + "/unRegister";
            return $http.post(requestURL, paramObj).then(function(response) {
                return response;
            });
        },
        // 發送特定User推播通知
        sendNotification: function(paramObj) {
            var requestURL = serviceContextRoot + "/doPush";
            return $http.post(requestURL, paramObj).then(function(response) {
                return response;
            });
        },
        // 取得帳戶資訊
        getDataList: function() {
            return $http.get(accountService).then(function(response) {
                return response;
            });
        },

        uploadFile: function(filePath, options) {
            showLoading();
            return $cordovaFileTransfer.upload(serverURL, filePath, options).then(function(result) {
                return result;
            })['finally'](function() {
                closeLoading();
            });;
        }
    }

    function showLoading(msg) {
        msg = msg || "載入中，請稍候...";
        $ionicLoading.show({
            template: '<span style="display:block;">' + msg + '</span><ion-spinner icon="ios-small"></ion-spinner>'
        })
    };

    function closeLoading() {
        $ionicLoading.hide();
    };
});
