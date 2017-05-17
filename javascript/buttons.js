
$(".homeb").css({ height: $(".homeb").width()})

var curl = window.location.href;
	curl = curl.replace("charts","");
	curl = curl.replace("tools","");
	curl = curl.replace("books","");
	if (curl.substring(curl.length-2) == "//") { curl = curl.substring(0, curl.length-1)}

d3.select("#homebutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', curl);
	$("#homepage").css({"visibility": "visible"});
	$(".type").css({"visibility": "hidden"});
})

d3.selectAll("#chartsbutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', curl + 'charts');
	$("#homepage").css({"visibility": "hidden"});
	$("#charts").css({"visibility": "visible"});
	$("#books").css({"visibility": "hidden"});
	$("#tools").css({"visibility": "hidden"});
})

d3.selectAll("#booksbutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', curl + 'books');
	$("#homepage").css({"visibility": "hidden"});
	$("#charts").css({"visibility": "hidden"});
	$("#books").css({"visibility": "visible"});
	$("#tools").css({"visibility": "hidden"});
})

d3.selectAll("#toolsbutton").on("click", function() {
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', curl + 'tools');
	$("#homepage").css({"visibility": "hidden"});
	$("#charts").css({"visibility": "hidden"});
	$("#books").css({"visibility": "hidden"});
	$("#tools").css({"visibility": "visible"});
})