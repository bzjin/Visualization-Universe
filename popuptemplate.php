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

echo "
<div id='$sub_type' class='overlay $sub_type'>
	<div class='popup'>
		<button class='close'>×</button>
		<div class='content'>
			<h3>$title</h3>
			<p>{description}</p>

			<h4> Popularity Over Time </h4>
			<div id='sparkline$sub_type'></div>
			
			<h4> Used to Depict </h4>
			<div id='queries$sub_type'></div>

			<h4> Name Variations </h4>
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
			.attr('width', width);

var g = svg.append('g').attr('transform', 'translate(20,10)');

var x = d3.scaleLinear()
    .range([20, width - 20]);

var y = d3.scaleLinear()
    .range([height - 10, 10]);

x.domain(d3.extent(tarray, function(d) { return +d.index; }));
y.domain(d3.extent(tarray, function(d) { return +d.value; }));

var linefunc = d3.line()
    .x(function(d) { return x(d.index); })
    .y(function(d) { return y(d.value); })
	.curve(d3.curveBasis);

var sparks = g.append('path')
      .datum(tarray)
      .attr('id', 'line'+i)
      .attr('fill', 'none')
      .attr('stroke', '#FDBD00')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', linefunc);

g.append('circle')
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

