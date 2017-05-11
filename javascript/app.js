$.getJSON("data/sample.json", function(data) {
    
	for (i=0; i<6; i++){
		var div = document.createElement('div');
		div.setAttribute('class', 'col-lg-2 col-md-3 col-sm-4 col-xs-6'); 
		div.setAttribute('id', 'b' + i); 
		document.getElementById("charts_boxes").appendChild(div);
		console.log(data.charts[i].name)
		$("div#b"+i).text(data.charts[i].name);
		$("div#b"+i).append("<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow=" + data.charts[i]["average-popularity"] +
		  "aria-valuemin='0' aria-valuemax='100' style='width:" + data.charts[i]["average-popularity"] + "%''><span class='sr-only'>70% Complete</span></div></div>");
	}
});

$(function() {
    $.ajax({
        url: 'http://www.google.com/trends/fetchComponent?q='+"book"+','+"barchart"+'&cid=TIMESERIES_GRAPH_0&export=3',
        type: 'GET',
		xhrFields: {
		    withCredentials: true
		  },        
        crossDomain: true,
        dataType: 'json',
        //headers: '[Does something go here?]',
        success: function(data, status, xhr)
        {
            console.log(data);
        },
        error: function(xhr, status, error)
        {
            console.log("Error: " + status + " " + error);
        }
    });
});



      /*
'use strict';

var util = require('util');
var googleTrends = require('../lib/google-trends-api.min.js');

googleTrends.interestOverTime({keyword: 'bar chart', startTime: new Date(Date.now() - (5 * 365 * 24 * 60 * 60 * 1000))})
.then(function(results){
  console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});*/
