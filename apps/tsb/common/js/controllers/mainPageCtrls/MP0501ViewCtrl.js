app.controller('MP0501ViewCtrl', function($scope, $ionicLoading) {

    var targetMarker;

    $scope.initMap = function() {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
            $scope.reloadGMLib();
        } else {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                mapTypeControl: false,
                center: { lat: 23.5444, lng: 121.000 },
                zoom: 7
            });

            var centerControlDiv = document.createElement('div');
            var centerControl = new $scope.CenterControl(centerControlDiv, map);
            centerControlDiv.index = 1;
            centerControlDiv.style['padding-top'] = '1em';
            $scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
            $scope.getCurrentPosition();
        }
    };

    $scope.CenterControl = function(controlDiv, map) {
        var controlUI = document.createElement('div');
        controlDiv.appendChild(controlUI);

        var myPosition = document.createElement('img');
        att = null;
        attr = document.createAttribute("src");
        attr.value = "images/btns/btn_myLocation.png";
        myPosition.setAttributeNode(attr);
        myPosition.style['width'] = '10em';

        controlUI.appendChild(myPosition);

        myPosition.addEventListener('click', function() {
            $scope.getCurrentPosition();
        });
    };

    $scope.getCurrentPosition = function() {
        showLoading('定位中，請稍候...')
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if ($scope.marker) {
                    $scope.marker.setMap(null)
                    $scope.marker = null;
                }

                var icon = {
                    url: "images/icons/walker.png",
                    scaledSize: new google.maps.Size(20, 30),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                };

                $scope.marker = new google.maps.Marker({
                    map: $scope.map,
                    position: pos,
                    icon: icon
                });

                $scope.map.setZoom(16);
                $scope.map.setCenter(pos);
                closeLoading();

            }, function() {
                console.log('get position error');
                closeLoading();
            });
        }
    };

    $scope.reloadGMLib = function() {
        document.head.removeChild(document.getElementById('googleMapLib'));
        var mapLib = document.createElement("script");
        mapLib.type = "text/javascript";
        mapLib.id = "googleMapLib";
        mapLib.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvlPSzXJqux0eTG6eFQLvB6CXnE47Htm0&callback=';
        document.head.appendChild(mapLib);
        mapLib.onload = function() {
            $scope.initMap();
        };
    };

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