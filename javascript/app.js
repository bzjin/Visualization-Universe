$.getJSON("data/sample.json", function(data) {
	data.charts.sort(function(a,b) { 
	    var nameA = a.name;
	    var nameB = b.name; 
	    if (nameA < nameB) { return -1; }
	    if (nameA > nameB) { return 1; }
	    return 0; 
	})
    makeGrids (data);
})

var tf_alpha = 1;
var tf_vol = 0;
var tf_delta = 0; 

function makeGrids(data){
	for (i=0; i< data.charts.length; i++){
		var div = document.createElement('div');
		div.setAttribute('class', 'col-lg-2 col-md-3 col-sm-4 col-xs-6 chartgrids'); 
		div.setAttribute('id', 'b' + i); 
		document.getElementById("charts").appendChild(div);
		//console.log(data.charts[i].name)
		$("div#b"+i).append("<img id='bimg"+i+"' src='assets/icons/pie-chart.png'>")
		$("div#b"+i).append("<p>"+data.charts[i].name+"</p>");
		$("div#b"+i).append("<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow=" + data.charts[i]["average-popularity"] +
		  "aria-valuemin='0' aria-valuemax='100' style='width:" + data.charts[i]["average-popularity"] + "%''><span class='sr-only'>70% Complete</span></div></div>");
	}
	var w = $("#b1").width();
	var h = $("#b1").height();
	var pos = $("#b1").position();

	d3.select("#alphabetize").on("click", function(){
		d3.selectAll(".chartgrids").transition()
			.style("opacity",0)
			.remove()

		if (tf_alpha == 0) {
			data.charts.sort(function(a,b) { 
			    var nameA = a.name;
			    var nameB = b.name; 
			    if (nameA < nameB) { return -1; }
			    if (nameA > nameB) { return 1; }
			    return 0; 
			  })
			tf_alpha = 1; 
		} else if (tf_alpha == 1) {
			data.charts.sort(function(a, b) { 
			    var nameA = a.name;
			    var nameB = b.name; 
			    if (nameA > nameB) { return -1; }
			    if (nameA < nameB) { return 1; }
			    return 0; 
			  })
			tf_alpha = 0; 
		}

	makeGrids(data)
	})

	d3.select("#volume").on("click", function(){
		d3.selectAll(".chartgrids").transition()
			.style("opacity",0)
			.remove()

		if (tf_volume == 0) {
			data.charts.sort(function(a,b) { 
			    var nameA = a.name;
			    var nameB = b.name; 
			    if (nameA < nameB) { return -1; }
			    if (nameA > nameB) { return 1; }
			    return 0; 
			  })
			tf_volume = 1; 
		} else if (tf_alpha == 1) {
			data.charts.sort(function(a, b) { 
			    var nameA = a.name;
			    var nameB = b.name; 
			    if (nameA > nameB) { return -1; }
			    if (nameA < nameB) { return 1; }
			    return 0; 
			  })
			tf_volume = 0; 
		}

	makeGrids(data)
	})

	d3.select("#delta").on("click", function(){
		d3.selectAll(".chartgrids").transition()
			.style("opacity",0)
			.remove()

		if (tf_delta == 0) {
			data.charts.sort(function(a,b) { 
			    var nameA = a["popularity-delta"];
			    var nameB = b["popularity-delta"]; 
			    if (nameA < nameB) { return -1; }
			    if (nameA > nameB) { return 1; }
			    return 0; 
			  })
			tf_delta = 1; 
		} else if (tf_alpha == 1) {
			data.charts.sort(function(a, b) { 
			    var nameA = a["popularity-delta"];;
			    var nameB = b["popularity-delta"];; 
			    if (nameA > nameB) { return -1; }
			    if (nameA < nameB) { return 1; }
			    return 0; 
			  })
			tf_delta = 0; 
		}

	makeGrids(data)
	})

}

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



