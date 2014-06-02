var myApp = angular.module('myAppFactories',[]);

myApp.factory('GoogService', ['$http', function($http){
	console.log('Use of Google factory');
	return {
		parseFeed: function (url){
			return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q='+encodeURIComponent(url));
		}
	}
}]);
myApp.factory('YQLService', ['$http', function($http){
	console.log('Use of Yahoo factory');
	return {
		parseFeed: function (url){
			return $http.jsonp('//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(url)+'%22&format=json&callback=JSON_CALLBACK');
		}
	}
}]);

myApp.factory('YQLStockService', ['$http', function($http){
	console.log('Use of Yhoo stock quotes factory');
	return {
		stockFeed: function (ticker){
			return $http.jsonp('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+ticker+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK');
		}
	}
}]);