/**
 * 
 */

app.factory('NotificationService', function ($http, $cordovaPush, $rootScope, $ionicPopup, $cordovaInAppBrowser) {
	
	var androidConfig = {
        "senderID": "211757737198",
    };
    var iosConfig = {
    	"badge": true,
    	"sound": true,
    	"alert": true,
    };

	 $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
		 console.log(JSON.stringify(notification));
		 if (notification.body) {
			 var msg = notification.body;
			 if(msg.startsWith("http") || msg.startsWith("https") ) {
				 $cordovaInAppBrowser.open(msg, '_blank', {});
			 } else {
				 $ionicPopup.alert({title: '發送者:' + notification.sid, content: msg});
			 }
		 }
		 if(notification.event) {
  			  switch(notification.event) {
	              case 'registered':
	                  if (notification.regid.length > 0 ) {
	                	  localStorage["DeviceToken"] = notification.regid;
	                	  console.log(localStorage["DeviceToken"]);
	                  }
	                  break;
	              case 'message':
	            	  var msg = notification.message;
	            	  if(msg.startsWith("http") || msg.startsWith("https")) {
	            		  $cordovaInAppBrowser.open(msg, '_blank', {});
	            	  } else {
	            		  $ionicPopup.alert({title: '發送者:' + notification.payload.sid,content: msg});
	     			  };
	                  break;
	              case 'error':
	                  alert('GCM error = ' + notification.msg);
	                  break;
	              default:
	                  alert('An unknown GCM event has occurred');
	                  break;
  			  }
		 }
      
    });
	
    return {
    	registerDeviceToke : function() {
      		localStorage["DeviceToken"] = "NO_TOKEN";
    	    // Android 註冊GCM推播
          $cordovaPush.register(androidConfig).then(function(result) {
              // Success
              console.log("register done!");
          }, function(err) {
              // Error
              console.log("register error!");
          });

          // iOS 註冊APNS推播
          $cordovaPush.register(iosConfig).then(function(deviceToken) {
              // Success 
              localStorage["DeviceToken"] = deviceToken;
          }, function(err) {
              // Error
              console.log("register error!");
          });
    	}
    }
});