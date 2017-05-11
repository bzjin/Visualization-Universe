$.getJSON("data/sample.json", function(data) {
	data.charts.sort(function(a,b) { 
	    var nameA = a.name;
	    var nameB = b.name; 
	    if (nameA < nameB) { return -1; }
	    if (nameA > nameB) { return 1; }
	    return 0; 
	})
	data = data; 
    makeGrids (data);
})

var tf_alpha = 0;
var tf_vol = 0;
var tf_delta = 0; 

function makeGrids(data){
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

	d3.select("#alphabetize").on("click", function(){
		 $('.col-lg-2').addClass("bye");
		 //$('.bye').addClass('transform-active');
		olddata = data; 

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

		data.charts.forEach(function(d){
			var num = data.charts.indexOf(d); 
			$('#b' + num).animate({
	           left: $('#b' + data.charts.indexOf(d)).offset().left-$("body").offset().left
	       });
		})


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



