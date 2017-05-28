$.getJSON("data/test.json", function(data) {
	loadVisuals ("charts");
	loadVisuals ("books");
	loadVisuals ("tools");
})

var tf_alpha = 1;
var tf_vol = 0;
var tf_delta = 0; 

function loadVisuals (type){
	d3.csv("data/samplequeries.csv", function(samples){
		//Make key
		var key = d3.select("#"+type+"key").append("svg")
			.attr("class", "key")
			.attr("height", 50)
			.attr("width", "100%")
			.style("overflow", "visible");

		key.append("text")
			.text("popularity change over the last year")
			.style("fill", "#FDBD00")
			.attr("x", 20)
			.attr("y", 20)
			.attr("font-weight", 300)

		key.append("path")
	      .attr("fill", "none")
	      .attr("stroke", "#FDBD00")
	      .attr("stroke-width", "5px")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("d", "M74,117,91,105,112,123,131,120,148,96,168,124,190,79,208,96,226,120,246,69,264,58,282,76")
	      .attr("transform", "translate(-190, -75)scale(.25)");

	     key.append("circle")
	     	.attr("r", 3)
	     	.attr("cx", -40)
	     	.attr("cy", 25)
	     	.attr("fill","#FDBD00")

	     key.append("text")
			.text("average popularity")
			.style("fill", "#FDBD00")
			.attr("x", $("#"+type+"key").width() + 20)
			.attr("y", 20)
			.attr("font-weight", 300)
			.style("text-anchor", "end")

		 key.append("rect")
	     	.attr("width", 100)
	     	.attr("height", 3)
	     	.attr("x", $("#"+type+"key").width() - 230)
	     	.attr("y", 15)
	     	.attr("fill","white")

	     key.append("rect")
	     	.attr("width", 70)
	     	.attr("height", 3)
	     	.attr("x", $("#"+type+"key").width() - 230)
	     	.attr("y", 15)
	     	.attr("fill","#F9543E")

	     var preload = {"charts": [], "books": [], "tools": []}
	     samples.forEach(function(d){
	     	if (d.type == type){
	     		preload[type].push(d);
	     	}
	     })

	     //from makeGrids
	     var fl = type.substring(0, 1); //first letter

	     //load icons and names ahead of time
		 for (i=0; i< preload[type].length; i++){
			var div = document.createElement('div');
			div.setAttribute('class', 'grids grid-item ' + type + "grids"); 
			div.setAttribute('id', fl + i); 

			var str = type + "grid";
			document.getElementById(str).appendChild(div);
			
			//Make PNG string to get image
			var pngstring = "";
			if (preload[type][i].sub_type.indexOf(' ') >= 0) {
				pngstring = preload[type][i].sub_type.replace(/\s+/g, '-');
			} else { pngstring = preload[type][i].sub_type}

			var href = 'pages/' + type + '/' + pngstring + ".html";

			var margin = {top: 5, right: 20, bottom: 5, left: 20},
			    width = $("#"+fl+i).width() - margin.left - margin.right,
			    height = 30;

			//Add all elements to div
			if (type != "books"){
				$("div#"+fl+i).append("<div class='circlebg'><img id='bimg"+i+"' src='assets/icons/"+pngstring+".png'></div>");
			} else {
				$("div#"+fl+i).append("<div class='bookbg'><img id='bookimg"+i+"' src='assets/icons/"+pngstring+".png'></div>");
			}
			//$("div#"+fl+i).append("<a href="+href+"><span class='empty'></span></a>");
			$("div#"+fl+i).append("<span class='empty' id='empty"+fl+i+"_"+pngstring+"_"+type+"'></span>");
			$("div#"+fl+i).append("<p class='name'>"+preload[type][i].sub_type+"</p>");
			$('.circlebg').css({'height':$('.circlebg').width()+'px'});
		}//end of for-loop

		//Load all API data
		setTimeout(function(){
			data_api[type].sort(function(a,b) { 
				    var nameA = a.name;
				    var nameB = b.name; 
				    if (nameA < nameB) { return -1; }
				    if (nameA > nameB) { return 1; }
				    return 0; 
				})
			makeGrids (data_api, type);
	    }, 3000)

	
	})//end of d3.csv

}//end of all

//Uses API data to fill in rest of visuals
function makeGrids(data, type){ 
	var fl = type.substring(0, 1); //first letter
	for (i=0; i< data[type].length; i++){

		var margin = {top: 5, right: 20, bottom: 5, left: 20},
			    width = $("#"+fl+i).width() - margin.left - margin.right,
			    height = 30;

		var pngstring = "";
		if (data[type][i].name.indexOf(' ') >= 0) {
			pngstring = data[type][i].name.replace(/\s+/g, '-');
		} else { pngstring = data[type][i].name}

		//Sort data for small sparkline
		var linedata = [];
		for (j=0; j<data[type][i]["search-volume-5yr"].length; j += 5){
			linedata.push({"index": j, "value":data[type][i]["search-volume-5yr"][j]});
		}
		//Sort data for pop-up sparkline
		var biglinedata = [];
		for (j=0; j<data[type][i]["search-volume-5yr"].length; j ++){
			biglinedata.push({"index": j, "value":data[type][i]["search-volume-5yr"][j]});
		}
		//Make pop-ups
		$.post('popuptemplate.php', { sub_type: pngstring, 
										folder: type, 
										linepoints: biglinedata, 
										queries: data[type][i].queries,
										topics: data[type][i].topics
								  }, function(result) { 
			$("#"+type).append(result);
		});
		//Make other pages with reliable URLs
		$.post('script.php', { sub_type: pngstring, folder: type }, function(result) { 
			//alert(result)
		});
		//Append invisible sortable text
		$("div#"+fl+i).append("<p class='volume'>"+data[type][i]["average-popularity"]+"</p><p class='delta'>"+data[type][i]["popularity-delta"]+"</p>");
		//Make popularity progress bar
		$("div#"+fl+i).append("<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow=" + data[type][i]["average-popularity"] +
		  "aria-valuemin='0' aria-valuemax='100' style='width:" + data[type][i]["average-popularity"] + "%''><span class='sr-only'>70% Complete</span></div></div>");
		
		//Appends link to icons
		d3.selectAll(".empty").on("click", function(){
			var namer = this.getAttribute("id").split(/[_]/)[1];
			var bigtype = this.getAttribute("id").split(/[_]/)[2];
			var url = window.location.href;
			if (url.substring(url.length-1) == "/") { url = url.substring(0, url.length-1)}
			window.history.pushState('object or string', 'THIS IS A NEW TITLE', url + "/" + namer);
			console.log(namer, bigtype)
			$("."+namer).show();
		}) 

		//Makes sparkline
		var svg = d3.select("#"+fl+i).append("svg")
			.attr("class", "lines")
			.attr("height", 50);

		var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var x = d3.scaleLinear()
		    .range([margin.left, width - margin.right]);

		var y = d3.scaleLinear()
		    .range([height - 10, 5]);

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

	} //end for-loop

	//Init Isotope
		var $grid = $('.isotopes'+type).isotope({
		  itemSelector: '.grid-item',
		  layoutMode: 'fitRows',
		  getSortData: {
		    name: '.name',
		    volume: '.volume parseInt',
		    delta: '.delta parseInt'
		  }
		});

		$sorts = $('#sorts'+type).on('click','button', function() {
		  	  var sortByValue = $(this).attr('data-sort-by');
		  	//Bind sort button click
			  var $this = $( this );

			  if ( $this.is('.is-checked') ) {
			  	console.log($('#sorts'+type).attr("text"))
			    $grid.isotope({ sortBy: sortByValue, sortAscending: false }); //Sort ascendingly
			  } else {
			  	console.log("else")
			    $grid.isotope({ sortBy: sortByValue, sortAscending: true }); //Sort descendingly
			  }
			 $this.toggleClass('is-checked');

		});

	var w = $("#"+fl+"1").width();
	var h = $("#"+fl+"1").height();
	var pos = $("#"+fl+"1").position();
}

