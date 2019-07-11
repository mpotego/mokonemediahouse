<?php
try{
header("Content-Type: application/json; charset=UTF-8");

/* if(isset($_POST['groupName'])) { */

/* echo 'server says hello world'; */

$inputJSON = $_POST['x'];
$inputArray = json_decode($inputJSON , true);

$adminEmail = '';
$groupName =  '';

$email_message = "<html><body>";
$email_message .= "<table border='1' style='border-collapse: collapse;'>"; 
$email_message .= "<tr>";
$email_message .= "<th colspan=4>Group Name: _The_Group_Name_Placeholder_ </td>" ;
$email_message .= "</tr>";
$email_message .= "<tr>						 ";
$email_message .= "   <th></th>              ";
$email_message .= "   <th>Name</th>          ";
$email_message .= "   <th>Cell</th>          ";
$email_message .= "   <th>Email</th>         ";
$email_message .= "   <th>Beer</th>          ";
$email_message .= "   <th>Extra 6 pack</th>  ";
$email_message .= " </tr>";
foreach($inputArray as $item) {
	
    $id = $item['id'];
	$name = $item['name'];
    $cell = $item['cell'];
    $email = $item['email'];
    $beer = $item['beer'];
    $extra = $item['extra'];  
    $isadmin = $item['isadmin'];
 
	if($isadmin == "01" || $isadmin == "1")
	{
		$adminEmail = $email; 
		$groupName = $item['groupname'];
	}
$email_message .= "<tr>";
$email_message .= "<td>" . $id . "</td>";
$email_message .= "<td>" . $name . "</td>";
$email_message .= "<td>" . $cell . "</td>";
$email_message .= "<td>" . $email . "</td>";
$email_message .= "<td>" . $beer . "</td>";
$email_message .= "<td>" . $extra . "</td>";
$email_message .= "</tr>";

} 

$email_message .= "</table>";
$email_message .= '</body></html>';
$email_message = str_replace("_The_Group_Name_Placeholder_", $groupName, $email_message);
 
 $email_to = 'Bookings@mokonemediahouse.com';
$email_subject = 'Website siRock iSaturday Registration';

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: '. $adminEmail . "\r\n"; 
 
// create email headers
 $headers = 'From: '.$adminEmail."\r\n".
'Reply-To: '.$adminEmail."\r\n" .
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