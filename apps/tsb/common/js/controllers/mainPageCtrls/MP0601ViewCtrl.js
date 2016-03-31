app.controller('MP0601ViewCtrl', function($scope, $ionicLoading, $cordovaDevice, APIService) {

    var UUID = $cordovaDevice.getDevice().uuid;
    var fileUploadURL = "http://YOUR_SERVER_IP:8080/ServletFileUploadSample/upload?file=";

    $scope.showPicture = function() {
        var d = new Date();
        var n = d.getMilliseconds();
        $scope.imgURL = fileUploadURL + UUID + ".jpg&time=" + n;
    };

    $scope.chooseSourceType = function() {
        WL.SimpleDialog.show(
            "照片上傳", "請選擇模式", [
                { text: "拍攝照片", handler: function() { takeSourceType('CAMERA') } },
                { text: "相簿選取", handler: function() { takeSourceType('PHOTOLIBRARY') } }
            ]
        );
    };

    function takeSourceType(sourceType) {
        navigator.camera.getPicture(
            uploadPhoto,
            function(message) { alert('失敗'); }, {
                quality: 50,
                targetWidth: 420,
                targetHeight: 320,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType[sourceType]
            }
        );
    };

    function uploadPhoto(imageURI) {

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = UUID + ".jpg";
        options.mimeType = "image/jpeg";

        var params = {};
        params.originName = imageURI.substr(imageURI.lastIndexOf('/') + 1);

        options.params = params;

        APIService.uploadFile(imageURI, options).then(function(result) {
            var d = new Date();
            var n = d.getMilliseconds();
            $scope.imgURL = fileUploadURL + UUID + ".jpg&time=" + n;
            console.log(result)
                // Success!
        }, function(err) {
            console.log(err)
                // Error
        }, function(progress) {
            console.log(progress)
                // constant progress updates
        });
    }
});
