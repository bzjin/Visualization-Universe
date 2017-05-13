$.getJSON("data/sample.json", function(data) {
	data.charts.sort(function(a,b) { 
	    var nameA = a.name;
	    var nameB = b.name; 
	    if (nameA < nameB) { return -1; }
	    if (nameA > nameB) { return 1; }
	    return 0; 
	})
    makeGrids (data, "charts");
    makeGrids (data, "books");

})

var tf_alpha = 1;
var tf_vol = 0;
var tf_delta = 0; 

function makeGrids(data, type){
	var fl = type.substring(0, 1); //first letter
	for (i=0; i< data[type].length; i++){
		var div = document.createElement('div');
		div.setAttribute('class', 'col-lg-2 col-md-3 col-sm-4 col-xs-6 grids ' + type + "grids"); 
		div.setAttribute('id', fl + i); 
		document.getElementById(type).appendChild(div);
		//console.log(data[type][i].name)
		$("div#"+fl+i).append("<img id='bimg"+i+"' src='assets/icons/pie-chart.png'>")
		$("div#"+fl+i).append("<p>"+data[type][i].name+"</p>");
		$("div#"+fl+i).append("<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow=" + data[type][i]["average-popularity"] +
		  "aria-valuemin='0' aria-valuemax='100' style='width:" + data[type][i]["average-popularity"] + "%''><span class='sr-only'>70% Complete</span></div></div>");
	}
	var w = $("#"+fl+"1").width();
	var h = $("#"+fl+"1").height();
	var pos = $("#"+fl+"1").position();

	d3.select("#alphabetize" + type).on("click", function(){
		d3.selectAll("."+type+"grids").transition()
			.style("opacity",0)
			.remove()

		if (tf_alpha == 0) {
			data[type].sort(function(a,b) { 
			    var nameA = a.name;
			    var nameB = b.name; 
			    if (nameA < nameB) { return -1; }
			    if (nameA > nameB) { return 1; }
			    return 0; 
			  })
			tf_alpha = 1; 
		} else if (tf_alpha == 1) {
			data[type].sort(function(a, b) { 
			    var nameA = a.name;
			    var nameB = b.name; 
			    if (nameA > nameB) { return -1; }
			    if (nameA < nameB) { return 1; }
			    return 0; 
			  })
			tf_alpha = 0; 
		}

	makeGrids(data, type)
	})

	d3.select("#volume"+type).on("click", function(){
		d3.selectAll("."+type+"grids").transition()
			.style("opacity",0)
			.remove()


		data[type].forEach(function(d){
			for (i=0; i<d["search-volume-5yr"].length; i++){
				d.sum += d["search-volume-5yr"][i];
			}
		})

		if (tf_vol == 0) {
			data[type].sort(function(a,b) { 
			    var nameA = a.sum;
			    var nameB = b.sum; 
			    if (nameA < nameB) { return -1; }
			    if (nameA > nameB) { return 1; }
			    return 0; 
			  })
			tf_vol = 1; 
		} else if (tf_vol == 1) {
			data[type].sort(function(a, b) { 
			    var nameA = a.sum;
			    var nameB = b.sum; 
			    if (nameA > nameB) { return -1; }
			    if (nameA < nameB) { return 1; }
			    return 0; 
			  })
			tf_vol = 0; 
		}

	makeGrids(data, type)
	})

	d3.select("#delta"+type).on("click", function(){
		d3.selectAll("."+type+"grids").transition()
			.style("opacity",0)
			.remove()


		if (tf_delta == 0) {
			data[type].sort(function(a,b) { 
			    var nameA = a["popularity-delta"];
			    var nameB = b["popularity-delta"]; 
			    if (nameA < nameB) { return -1; }
			    if (nameA > nameB) { return 1; }
			    return 0; 
			  })
			tf_delta = 1; 
		} else if (tf_delta == 1) {
			data[type].sort(function(a, b) { 
			    var nameA = a["popularity-delta"];;
			    var nameB = b["popularity-delta"];; 
			    if (nameA > nameB) { return -1; }
			    if (nameA < nameB) { return 1; }
			    return 0; 
			  })
			tf_delta = 0; 
		}

	makeGrids(data, type)
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



