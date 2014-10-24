<?php
if($_POST){
	$data = json_decode($_POST['data']);
	
	$to = "mijeamihai@yahoo.com";
	$subject = "[mijeamihai.com] - ". $data->email;
	$message = " Name: " . $data->name . "\r\n Email: " . $data->email . "\r\n Message: " . $data->text;
	 
	 
	$from = "mihai@mijeamihai.com";
	$headers = "From:" . $from . "\r\n";
	$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n"; 
	 
	if(@mail($to,$subject,$message,$headers)){
		//var_dump(json_encode( array( 'succes' => true )));
	 	print_r(json_encode( array( 'success' => true )));	  
	}else{
		//var_dump(json_decode($_POST['data']));
	  	print_r(json_encode( array( 'success' => false )));
	}
}
?>