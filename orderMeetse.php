<?php
try{
header("Content-Type: application/json; charset=UTF-8");

/* if(isset($_POST['x'])) { */

 /* echo 'server says hello world \n';  */

$inputJSON = $_POST['x'];
$inputRequest = json_decode($inputJSON , true);
$inputArray = $inputRequest["bottletypes"];
 
$name = $inputRequest['name'];
$cell = $inputRequest['cell'];
$email = $inputRequest['email']; 
$comments = $inputRequest['comment']; 

$email_message = "<body><html>";
$email_message .= "<table border='1' style='border-collapse: collapse;'>"; 
  
$email_message .= "<tr>               "; 
$email_message .= "<td>Name </td>";
$email_message .= '<td colspan="2">' . $name . "</td>";
$email_message .= " </tr>			  ";

$email_message .= "<tr>               "; 
$email_message .= "<td>Cell</td>";
$email_message .= '<td colspan="2">' . $cell . "</td>";
$email_message .= " </tr>				";

$email_message .= "<tr>               "; 
$email_message .= "<td>Email</td>";
$email_message .= '<td colspan="2">' . $email . "</td>";
$email_message .= " </tr>				";

$email_message .= "<tr>               "; 
$email_message .= "<td>Comments</td>";
$email_message .= '<td colspan="2">' . $comments . "</td>";
$email_message .= " </tr>				";	

$email_message .= "<tr>               "; 
$email_message .= "   <th></th>       ";
$email_message .= "   <th>Bottle</th> ";
$email_message .= "   <th>Count</th>  ";  
$email_message .= " </tr>			  ";

foreach($inputArray as $item) {
	
  $id = $item['id'];
  
  if($id > 0){
	  
	$bottletype = $item['bottletype'];
	$quantity = $item['quantity'];	

	$email_message .= "<tr>";
	
	$email_message .= "<td>" . $id . "</td>";
	$email_message .= "<td>" . $bottletype . "</td>";
	$email_message .= "<td>" . $quantity . "</td>";  
	
	$email_message .= "</tr>";
  }

} 

$email_message .= "</table>";
$email_message .= '</body></html>'; 
  
$email_to = 'orders@mokonemediahouse.com';
$email_subject = 'Website siRock iSaturday Registration';

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: '. $email . "\r\n"; 
 
// create email headers
 $headers = 'From: '.$email."\r\n".
'Reply-To: '.$email."\r\n" .
'X-Mailer: PHP/' . phpversion(); 
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  
 if (mail($email_to, $email_subject, $email_message, $headers)) {    
	echo "1";
} else {    
	echo "0";
 }   
/*End of Sending the email */ 
}catch(Exception $e )
{
	echo $e;
}
?>