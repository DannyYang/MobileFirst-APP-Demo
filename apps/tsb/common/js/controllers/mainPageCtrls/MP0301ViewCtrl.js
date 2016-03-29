/**
 * 我的帳戶頁面Controller
 */

app.controller('MP0301ViewCtrl', function($scope, $state, $timeout, APIService) {	
	var dataListArray=[];
	var n = 0;
	$scope.dataList=[];
	$scope.noMoreItemsAvailable = false;
	
	getDataList();
	
	function getDataList(){
		APIService.getDataList().then(function(res){
			console.log(res);
			loadDataList(res.data);
		});	
	};
	
	function loadDataList(dataList) {
		dataListArray = dataList;
		for(var i = 0; i < 5 ; i++){
			$scope.dataList.push(dataList[n]);
			n = (n+1);
			if(dataList.length < n){
			    $scope.noMoreItemsAvailable = true;
				break;
			}
		}
	};
	
	$scope.loadMore = function() {
		$timeout( function() {
			if(dataListArray!='')
				loadDataList(dataListArray);
			$scope.$broadcast('scroll.infiniteScrollComplete');			
		},500);
	};
	
	$scope.refreshList = function() {
		n=0;
		$scope.dataList.length = 0;
		dataListArray.length = 0;
		
		getDataList();
		$scope.$broadcast('scroll.refreshComplete');
	};
	
	$scope.go = function(goName) {
		$state.go('accountDetail', goName);
	}
});