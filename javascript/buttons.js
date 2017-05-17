
$(".homeb").css({ height: $(".homeb").width()})
$("#homepage").show();

d3.select("#homebutton").on("click", function() {
	var curl = window.location.href;
	curl = curl.replace("charts","");
	curl = curl.replace("tools","");
	curl = curl.replace("books","");
	if (curl.substring(curl.length-2) == "//") { curl = curl.substring(0, curl.length-1)}
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', curl);
	$("#homepage").show();
	$(".type").hide();
})

d3.selectAll("#chartsbutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', './charts');
	$("#homepage").hide();
	$("#charts").show();
	$("#books").hide();
	$("#tools").hide();
})

d3.selectAll("#booksbutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', './books');
	$("#homepage").hide();
	$("#charts").hide();
	$("#books").show();
	$("#tools").hide();
})

d3.selectAll("#toolsbutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', './tools');
	$("#homepage").hide();
	$("#charts").hide();
	$("#books").hide();
	$("#tools").show();
})