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
		div.setAttribute('class', 'col-lg-2 col-md-3 col-sm-4 col-xs-6 grids grid-item ' + type + "grids"); 
		div.setAttribute('id', fl + i); 

		var str = type + "grid";
		document.getElementById(str).appendChild(div);
		
		//Make PNG string to get image
		var pngstring = "";
		if (data[type][i].name.indexOf(' ') >= 0) {
			pngstring = data[type][i].name.replace(/\s+/g, '-');
		} else { pngstring = data[type][i].name}

		var margin = {top: 5, right: 20, bottom: 5, left: 20},
		    width = $("#"+fl+i).width() - margin.left - margin.right,
		    height = 30;

		//Add all elements to div
		$("div#"+fl+i).append("<div class='circlebg'><img id='bimg"+i+"' src='assets/icons/"+pngstring+".png'>");
		$("div#"+fl+i).append("<p class='name'>"+data[type][i].name+"</p><p class='volume'>"+data[type][i]["average-popularity"]+"</p><p class='delta'>"+data[type][i]["popularity-delta"]+"</p>");
		$("div#"+fl+i).append("<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow=" + data[type][i]["average-popularity"] +
		  "aria-valuemin='0' aria-valuemax='100' style='width:" + data[type][i]["average-popularity"] + "%''><span class='sr-only'>70% Complete</span></div></div>");
		
		$('.circlebg').css({'height':$('.circlebg').width()+'px'});

		//Sort data for sparkline
		var linedata = [];
		for (j=0; j<data[type][i]["search-volume-5yr"].length; j++){
			linedata.push({"index": j, "value":data[type][i]["search-volume-5yr"][j]});
		}

		//Make sparkline
		var svg = d3.select("#"+fl+i).append("svg")
			.attr("class", "lines")
			.attr("height", 35);

		var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var x = d3.scaleLinear()
		    .range([margin.left, width - margin.right]);

		var y = d3.scaleLinear()
		    .range([height, 0]);

  		x.domain(d3.extent(linedata, function(d) { return d.index; }));
  		y.domain(d3.extent(linedata, function(d) { return d.value; }));

		var line = d3.line()
		    .x(function(d) { return x(d.index); })
		    .y(function(d) { return y(d.value); })
    		.curve(d3.curveBasis);

		var sparks = g.append("path")
		      .datum(linedata)
		      .attr("id", "line"+i)
		      .attr("fill", "none")
		      .attr("stroke", "#FDBD00")
		      .attr("stroke-linejoin", "round")
		      .attr("stroke-linecap", "round")
		      .attr("stroke-width", 1.5)
		      .attr("d", line);

		g.append("circle")
		      .attr("fill", "#FDBD00")
		      .attr("r", 3)
		      .attr("cx", x(linedata[0].index))
		      .attr("cy", y(linedata[0].value))

	}

	//Init Isotope
		var $grid = $('.isotopes'+type).isotope({
		  itemSelector: '.grid-item',
		  layoutMode: 'fitRows',
		  getSortData: {
		    name: '.name',
		    volume: '.volume',
		    delta: '.delta'
		  }
		});

		$('#sorts' + type).on( 'click', 'button', function() {
		  var sortByValue = $(this).attr('data-sort-by');
		  $grid.isotope({ sortBy: sortByValue });
		});


		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
		  var $buttonGroup = $( buttonGroup );
		  $buttonGroup.on( 'click', 'button', function() {
		    $buttonGroup.find('.is-checked').removeClass('is-checked');
		    $( this ).addClass('is-checked');
		  });
		});

	var w = $("#"+fl+"1").width();
	var h = $("#"+fl+"1").height();
	var pos = $("#"+fl+"1").position();

	d3.select("#alphabetize" + type).on("click", function(){
		d3.selectAll("."+type+"grids")
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
		d3.selectAll("."+type+"grids")
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
		d3.selectAll("."+type+"grids")
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
            //console.log(data);
        },
        error: function(xhr, status, error)
        {
            console.log("Error: " + status + " " + error);
        }
    });
});



