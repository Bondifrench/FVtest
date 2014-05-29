'use strict';

var myApp = angular.module('myApp', ['ngSanitize']);
console.log('Loading App Controllers');


myApp.controller('NewsCtrl', ['$scope','YQLService', function($scope, Feed){
	console.log('Loading News Controllers');
	$scope.loadButtonText = 'Choose News Feed ';
	$scope.RSSList = [
		{Title: "CNN ",
		url: 'http://rss.cnn.com/rss/cnn_topstories.rss'},
		{Title: "SEC new USGAAP XBRL reports ",
		url: 'http://www.sec.gov/Archives/edgar/usgaap.rss.xml'},
		{Title: "Reuters US Markets ",
		url: 'http://feeds.reuters.com/news/usmarkets'},
		{Title: "CNBC Top News ",
		url: 'http://www.cnbc.com/id/100003114/device/rss/rss.html'},
		{Title: "CNBC Earnings ",
		url: 'http://www.cnbc.com/id/15839135/device/rss/rss.html'},
		{Title: "CNBC Europe News ",
		url: 'http://www.cnbc.com/id/19794221/device/rss/rss.html'},
		{Title: "CNBC Investing ",
		url: 'http://www.cnbc.com/id/15839069/device/rss/rss.html'},
		{Title: "Reuters World News ",
		url: 'http://feeds.reuters.com/Reuters/worldNews'},
		{Title: "Reuters Bonds ",
		url: 'http://feeds.reuters.com/reuters/bondsNews'},
		{Title: "Reuters Basic Materials ",
		url: 'http://feeds.reuters.com/reuters/basicmaterialsNews'},
		{Title: "Reuters Industrials ",
		url: 'http://feeds.reuters.com/reuters/industrialsNews'},
		{Title: "Reuters Technology ",
		url: 'http://feeds.reuters.com/reuters/technologysectorNews'},
		{Title: "Reuters US TMT ",
		url: 'http://feeds.reuters.com/reuters/UStechnologyTelcomNews'},
		{Title:'Bloomberg Views ',
		url:'http://www.bloombergview.com/rss'},
		{Title: 'Seeking Alpha Latest ',
		url: 'http://seekingalpha.com/feed.xml'},
		{Title: 'Seeking Alpha Transcripts ',
		url: 'http://seekingalpha.com/sector/transcripts.xml'},
		{Title: 'Seeking Alpha Long Ideas ',
		url: 'http://seekingalpha.com/tag/long-ideas.xml'}
	];
	//Adding pagination
	$scope.itemsPerPage=10;

	//Loading the news items
	$scope.loadFeed = function (url, e) {
		//e is just short for event, any variable can be put actually
		//is used by jQuery
		console.log('Loading Feed to button' + e.target);
		$scope.url= url;
		Feed.parseFeed(url).then(function (res) {
			//angular.element wraps a raw DOM element or HTML string as a JQuery element
			//If jQuery is available, angular.element is an alias for the jQuery function
			//If it is not available, angular.element delegates to Angular's built-in subset of jQuery, called jqlite 
			$scope.loadButtonText=angular.element(e.target).text();
			console.log(res.data);
			//$scope.NewsSourceTitle=res.data
			//$scope.NewsSourceTitle=res.data.responseData.feed.title;
			//$scope.feeds = res.data.responseData.feed.entries;
			$scope.feeds=res.data.query.results.item;
			});
	}	
}]);
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

myApp.controller('StockCtrl', ['$scope', 'YQLStockService', function($scope, Stock){
	var ticker='CSCO';
	Stock.stockFeed(ticker).then(function (res) {
		console.log(res.data.query.results.quote);
		$scope.stocks= res.data.query.results.quote;
	});
}]);
myApp.factory('YQLStockService', ['$http', function($http){
	console.log('Use of Yhoo stock quotes factory');
	return {
		stockFeed: function (ticker){
			return $http.jsonp('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+ticker+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK');
		}
	}
}]);
