<?php
	$fresh_data = $_POST["data_json"];
	echo $fresh_data;

	$myFile = "..data/fresh_data.json";
	$fh = fopen($myFile, 'w') or die("can't open file");
	$stringData = $fresh_data;
	fwrite($fh, $stringData);
	fclose($fh)
?>