<?php 
$sub_type = $_POST["sub_type"];
$folder = $_POST["folder"];
$title = ucwords(str_replace("-", " ", $sub_type));

echo "
<div id='$sub_type' class='overlay $sub_type col-md-8 col-md-offset-2'>
	<div class='popup'>
		<button class='close'>×</button>
		<div class='content'>
			<h3>$title</h3>
			<p>{description}</p>

			<h4> Popularity Over Time </h4>
			<div id='sparkline $sub_type $folder'></div>
			
			<h4> Used to Depict </h4>
			<div id='bars'></div>

			<h4> Name Variations </h4>
			<div id='related'></div>
		</div>
	</div>
</div>
<script>
$('.overlay').hide()
d3.selectAll('.overlay').on('click', function(){
	window.history.pushState('object or string', 'THIS IS A NEW TITLE', './' );
	$('.overlay').hide();
})
</script>"
?>

