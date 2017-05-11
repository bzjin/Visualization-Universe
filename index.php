<!DOCTYPE html>

<html>

<head lang="en">
	<meta charset="utf-8">
	<title>Visualization Universe</title>

	<!-- D3 Library --> <script src="lib/d3.v4.min.js"></script>
    <!-- D3-Tip --> <script src="lib/d3-tip.js"></script>
	<!-- Google Fonts --> <link href="styles/google-fonts.css" rel="stylesheet"> 
	<!-- Google Library --> <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeE76hCI-RqAFCtzlgOOF65iSgtzwhrDE&callback=initMap"
    type="text/javascript"></script>
	<!-- Jquery -->   <script src="lib/jquery-1.12.4.min.js"></script>
  	<script src="lib/jquery-1.12.1-ui.js"></script>
  	<!-- Ajax -->   <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<!-- Bootstrap--> <script src="lib/bootstrap.min.js"></script> <link rel="stylesheet" href="styles/bootstrap.min.css">
	<link rel="stylesheet" href="styles/app.css"/>
</head>


<body>
	<div class="col-md-10 col-md-offset-1">
		<h1>Visualization Universe</h1>

		<div id="books" class="col-md-12">
		<h2>Books</h2>
		sort by 
		<button type="button" onclick="alphabetize()">name</button>
		<button type="button" onclick="volume()">search volume</button>
		<button type="button" onclick="delta()">change in search volume</button>
		<div id="books_boxes"></div>
		</div>

		<h2>Charts</h2>
		<h2>People</h2>
		<h2>Tools</h2>
	</div>
</body>


	<script src="javascript/app.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.12.2.js"></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
</html>