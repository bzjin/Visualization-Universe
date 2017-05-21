// Define empty array
var data_api = {"charts":[], "books":[], "tools":[]};

//Use Google Trends API at http://developers.google.com/apis-explorer/#p/trends/v1beta/ 
function use_api (type){
	d3.csv("data/samplequeries.csv", function(results){
		var termstring = "";
		//for (i=0; i<3; i++){
		results.forEach(function(d){   
			//var plussigns = results[i].sub_type.replace(/\s+/g, '+');
			if (d.type == type){
				var plussigns = d.sub_type.replace(/\s+/g, '+');
				plussigns = plussigns.replace(/:\s*/g, "%3a");
				plussigns = plussigns.replace(/,/g , "%2C");

				termstring = "terms=" + plussigns + "&"; 
			}
			var find_spark = "https://www.googleapis.com/trends/v1beta/graph?" + termstring + "key=AIzaSyCotwfmGjVpwkESwMesqFwfOLTFsbru-Lc";
			var find_volume = "https://www.googleapis.com/trends/v1beta/graphAverages?" + termstring + "key=AIzaSyCotwfmGjVpwkESwMesqFwfOLTFsbru-Lc"
			// Volume past five years
			$(function() {
			    $.ajax({
			        url: find_spark,
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
			        	for (i=0; i< data.lines[0].points.length; i++){
			        		vol_array.push(data.lines[0].points[i].value);
			            }

			            data_api[type].push({"name": data.lines[0].term, "volume": vol_array });
			        },
			        error: function(xhr, status, error)
			        {
			            console.log("Error: " + status + " " + error);
			        }
			    });
			});

			// Volume average past five years
			/*
			$(function() {
			    $.ajax({
			        url: find_volume,
			        type: 'GET',
					xhrFields: {
					    withCredentials: true
					  },        
			        crossDomain: true,
			        dataType: 'json',
			        //headers: '[Does something go here?]',
			        success: function(data, status, xhr)
			        {
			            console.log(find_volume)
			            data_api[type].push({"name": data.lines[0].term, "volume": vol_array });
			        },
			        error: function(xhr, status, error)
			        {
			            console.log("Error: " + status + " " + error);
			        }
			    });
			});*/
		})
		
	})
	console.log(data_api)
}

use_api("charts");
use_api("books");
use_api("tools");
