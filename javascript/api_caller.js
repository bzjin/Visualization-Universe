var data_api = {"charts":[], "books":[], "tools":[]};

function use_api (type){
	d3.csv("data/samplequeries.csv", function(results){
		var termstring = "";
		//for (i=0; i<3; i++){
		results.forEach(function(d){   
			//var plussigns = results[i].sub_type.replace(/\s+/g, '+');
			if (d.type == type){
				var plussigns = d.sub_type.replace(/\s+/g, '+');
				//plussigns = plussigns.replace(/:\s*/g, "%3a");
				//plussigns = plussigns.replace(/,/g , "%2C");

				termstring = "terms=" + plussigns + "&"; 
				termquery = "term=" + plussigns + "&"; 
			
			var findtrends = "https://www.googleapis.com/trends/v1beta/graph?" + termstring + "key=AIzaSyCotwfmGjVpwkESwMesqFwfOLTFsbru-Lc";
			var topqueries = "https://www.googleapis.com/trends/v1beta/topQueries?" + termquery + "key=AIzaSyCotwfmGjVpwkESwMesqFwfOLTFsbru-Lc"
			var toptopics = "https://www.googleapis.com/trends/v1beta/topTopics?" + termquery + "key=AIzaSyCotwfmGjVpwkESwMesqFwfOLTFsbru-Lc"

			// Volume past five years
			
			$(function() {
			    $.ajax({
			        url: findtrends,
			        type: 'GET',
					xhrFields: {
					    withCredentials: true
					  },        
			        crossDomain: true,
			        dataType: 'json',
			        //headers: '[Does something go here?]',
			        success: function(data, status, xhr)
			        {
			        	var vol_array = [];
			        	var total = 0;
			        	var length = data.lines[0].points.length;
			        	for (i=0; i< length; i++){
			        		vol_array.push(data.lines[0].points[i].value);
			            	total += +data.lines[0].points[i].value;
			            }
			            var avg = total/length; 
			            var chng = vol_array[vol_array.length - 1] - vol_array[vol_array.length - 24];
			            data_api[type].push({"name": data.lines[0].term, "search-volume-5yr": vol_array, "queries": [], "average-popularity": avg, "topics": [], "popularity-delta": chng });
			        },
			        error: function(xhr, status, error)
			        {
			        	//console.log(termstring);
			            //console.log("Error: " + status + " " + error);
			        }
			    });
			});

			// Top Queries
			$(function() {
			    $.ajax({
			        url: topqueries,
			        type: 'GET',
					xhrFields: {
					    withCredentials: true
					  },        
			        crossDomain: true,
			        dataType: 'json',
			        //headers: '[Does something go here?]',
			        success: function(data, status, xhr)
			        {
			        	var top_queries = [];

			        	if (data.item != undefined){
			        		for (i=0; i< data.item.length; i++){
			        			top_queries.push({"query": data.item[i].title, "volume": data.item[i].value});
			            	}
			            }

			            data_api[type].forEach(function(j){
			            	if (j.name == d.sub_type){
			            		j.queries = top_queries;
			            	}
			            })
			        },
			        error: function(xhr, status, error)
			        {
			        	//console.log(termstring);
			            //console.log("Error: " + status + " " + error);
			        }
			    });
			});

			// Top Queries
			$(function() {
			    $.ajax({
			        url: toptopics,
			        type: 'GET',
					xhrFields: {
					    withCredentials: true
					  },        
			        crossDomain: true,
			        dataType: 'json',
			        //headers: '[Does something go here?]',
			        success: function(data, status, xhr)
			        {
			        	var top_topics = [];

			        	if (data.item != undefined){
			        		for (i=0; i< data.item.length; i++){
			        			top_topics.push({"topic": data.item[i].title, "volume": data.item[i].value});
			            	}
			            }

			            data_api[type].forEach(function(j){
			            	if (j.name == d.sub_type){
			            		j.topics = top_topics;
			            	}
			            })
			        },
			        error: function(xhr, status, error)
			        {
			        	//console.log(termstring);
			            //console.log("Error: " + status + " " + error);
			        }
			    });
			});

			}
		})
	})
}

use_api("charts");
use_api("tools");
use_api("books");

var str_json = JSON.stringify(data_api);

data_api.charts.forEach(function(d){
	console.log(d)
})

$.post('assets/savejson.php', { data_json: str_json}, function(result) { 
	//alert(result)
});

