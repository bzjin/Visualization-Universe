<?php 
$sub_type = $_POST["sub_type"];
$folder = $_POST["folder"];
$sparkpoints = $_POST["linepoints"];
$querypoints = $_POST["queries"];
$topicpoints = $_POST["topics"];

$linemaker = json_encode($sparkpoints);
$querymaker= json_encode($querypoints);
$topicmaker= json_encode($topicpoints);

$title = ucwords(str_replace("-", " ", $sub_type));
$searchable = ucwords(str_replace("-", "%20", $sub_type));

echo "
<div id='$sub_type' class='overlay $sub_type'>
	<div class='popup'>
		<button class='close'>×</button>
		<div class='content'>
			<h3 class='col-md-12'>$title</h3>
			<div id='iconimg' class='popleft col-md-2'><img src='assets/icons/$sub_type.png'></div>
			<div id='description' class='popleft col-md-8'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
				<p> <a class='toplink' href='https://trends.google.com/trends/explore?q=$searchable'> Read more </a> </p></div>

			<h4 class='col-md-12'> Popularity Over Time </h4>
			<div id='sparkline$sub_type' class='sparkline'></div>
			<p> <a class='bottomlink' href='https://trends.google.com/trends/explore?q=$searchable' target='_blank'> <strong>View more</strong> on Google Trends </a> </p></div>

			<br />
			
			<h4 class='col-md-12'> Related Queries </h4>
			<div id='queries$sub_type'></div>

			<h4 class='col-md-12'> Related Topics </h4>
			<div id='topics$sub_type'></div>
		</div>
	</div>
</div>
<script>
$('.overlay').hide()
d3.selectAll('.overlay').on('click', function(){
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', './' );
	$('.overlay').hide();
})

var tarray = $linemaker;
var qarray = $querymaker;
var sarray = $topicmaker; 

var width = 600;
var height = 200; 

var svg = d3.selectAll('#sparkline$sub_type').append('svg')
			.attr('class', 'bigline')
			.attr('height', height)
			.attr('width', width)
			.style('overflow', 'visible');

//var g = svg.append('g').attr('transform', 'translate(20,10)');

var x = d3.scaleLinear()
    .range([30, width - 10]);

var month = d3.timeFormat('%B %Y');
var thismonth = d3.timeFormat('%B');
var today = new Date();
var dayString = month(today).toString()
var newYear = + dayString.substring(dayString.indexOf(' ')) - 5;

svg.append('text')
	.text(thismonth(today) + ' ' + newYear)
	.attr('x', 30)
	.attr('y', 195)
	.style('fill', 'white')
	.style('font-size', 10)

svg.append('text')
	.text(month(today))
	.attr('x', width-10)
	.attr('y', 195)
	.style('fill', 'white')
	.style('font-size', 10)

var y = d3.scaleLinear()
    .range([height - 20, 20]);

x.domain(d3.extent(tarray, function(d) { return +d.index; }));
y.domain([0, 100]);

var xAxis = d3.axisBottom(x).ticks(30);
var yAxis = d3.axisLeft(y).tickSize(-570).tickValues([0,50,100]).ticks(4);

svg.append('g').attr('class', 'axis')
	.attr('transform', 'translate(0, 180)')
	.call(xAxis)
	.selectAll('text')
		.remove();

svg.append('g').attr('class', 'axis')
	.attr('transform', 'translate(30, 0)')
	.call(yAxis)
		.selectAll('text')
		.style('transform', 'translate(-20, 0)')

var linefunc = d3.line()
    .x(function(d) { return x(d.index); })
    .y(function(d) { return y(d.value); })
	.curve(d3.curveBasis);

var sparks = svg.append('path')
      .datum(tarray)
      .attr('id', 'line'+i)
      .attr('fill', 'none')
      .attr('stroke', '#FDBD00')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', linefunc);

svg.append('circle')
      .attr('fill', '#FDBD00')
      .attr('r', 3)
      .attr('cx', x(tarray[0].index))
      .attr('cy', y(tarray[0].value))

if (qarray != null) {
	var hq = qarray.length * 30; 
	var svgq = d3.selectAll('#queries$sub_type').append('svg')
			.attr('class', 'bigline')
			.attr('height', hq)
			.attr('width', width);

	var xq = d3.scaleLinear()
    	.domain([0, 100])
    	.range([200, width - 20]);

	var yq = d3.scaleLinear()
		.domain([0, qarray.length])
    	.range([hq - 20, 20]);

    svgq.selectAll('.qrectf')
      .data(qarray)
      .enter()
      	  .append('rect')
	      .style('fill', 'white')
	      .attr('x', xq(0))
	      .attr('y', function(d){
	      	return yq(qarray.indexOf(d))})
	      .attr('width', xq(100) - 200)
	      .attr('height', 5)

    svgq.selectAll('.qrect')
      .data(qarray)
      .enter()
      	  .append('rect')
	      .style('fill', '#F9543E')
	      .attr('x', xq(0))
	      .attr('y', function(d){
	      	return yq(qarray.indexOf(d))})
	      .attr('width', function(d){
	      	return xq(+d.volume) - 200})
	      .attr('height', 5)

	svgq.selectAll('.qtxt')
      .data(qarray)
      .enter()
      	  .append('text')
	      .style('fill', 'white')
	      .attr('x', xq(-10))
	      .attr('y', function(d){
	      	return yq(qarray.indexOf(d))})
	      .style('text-anchor', 'end')
	      .text(function(d){
	      	return d.query; 
	      })
}

if (sarray != null) {
	var ht = sarray.length * 30; 
	var svgt = d3.selectAll('#topics$sub_type').append('svg')
			.attr('height', ht)
			.attr('width', width);

	var xt = d3.scaleLinear()
    	.domain([0, 100])
    	.range([200, width - 20]);

	var yt = d3.scaleLinear()
		.domain([0, sarray.length])
    	.range([ht - 20, 20]);

    svgt.selectAll('.trectf')
      .data(sarray)
      .enter()
      	  .append('rect')
	      .style('fill', 'white')
	      .attr('x', xt(0))
	      .attr('y', function(d){
	      	return yt(sarray.indexOf(d))})
	      .attr('width', xt(100) - 200)
	      .attr('height', 5)

    svgt.selectAll('.trect')
      .data(sarray)
      .enter()
      	  .append('rect')
	      .style('fill', '#F9543E')
	      .attr('x', xt(0))
	      .attr('y', function(d){
	      	return yt(sarray.indexOf(d))})
	      .attr('width', function(d){
	      	return xt(+d.volume) - 200})
	      .attr('height', 5)

	svgt.selectAll('.ttxt')
      .data(sarray)
      .enter()
      	  .append('text')
	      .style('fill', 'white')
	      .attr('x', xt(-10))
	      .attr('y', function(d){
	      	return yt(sarray.indexOf(d))})
	      .style('text-anchor', 'end')
	      .text(function(d){
	      	return d.topic; 
	      })

}
</script>"
?>

