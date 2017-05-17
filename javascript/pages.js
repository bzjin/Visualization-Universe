$.getJSON("../../data/sample.json", function(data) {

    makeSpark(data, "charts");

})

function makeSpark(data, type){
		//Make sparkline
		var svg = d3.select("#sparkline").append("svg")
			.attr("class", "sparkline")
			.attr("height", 200)
			.attr("width", $("#sparkline").width())
		
		var thisclass = $("#sparkline").attr("class");

		console.log("wee", thisclass);
		//Sort data for sparkline
		/*var linedata = [];
		for (j=0; j<data[type][i]["search-volume-5yr"].length; j++){
			linedata.push({"index": j, "value":data[type][i]["search-volume-5yr"][j]});
		}

		var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var x = d3.scaleLinear()
		    .range([10, width - 10]);

		var y = d3.scaleLinear()
		    .range([190, 10]);

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
		      .attr("cy", y(linedata[0].value))*/

	}


