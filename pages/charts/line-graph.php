<html>
<head lang='en'>
	<meta charset='utf-8'>
	<title>Visualization Universe</title>

	<!-- D3 Library --> <script src='../../lib/d3.v4.min.js'></script>
    <!-- D3-Tip --> <script src='../../lib/d3-tip.js'></script>
	<!-- Google Fonts --> <link href='../../styles/google-fonts.css' rel='stylesheet'>
  	<script src='../../lib/jquery-1.12.4.min.js'></script>
	<script src='../../lib/jquery-1.12.1-ui.js'></script>
	<!-- Bootstrap--> <script src='../../lib/bootstrap.min.js'></script> 
	<link rel='stylesheet' href='../../styles/bootstrap.min.css'>
	<link rel='stylesheet' href='../../styles/app.css'/>
	<script src='../../javascript/pages.js'></script>
</head>
<body>
	<div class='col-md-10 col-md-offset-1 page'>
		<h3>Line Graph</h3>
		<p class='col-md-6'>{description}</p>

		<h4> Popularity Over Time </h4>
		<div id='sparkline line-graph charts' class='col-md-6'></div>
		
		<h4> Used to Depict </h4>
		<div id='bars' class='col-md-6'></div>

		<h4> Name Variations </h4>
		<div id='related' class='col-md-6'></div>
	</div>
</body>
</html>