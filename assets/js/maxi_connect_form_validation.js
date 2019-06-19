 
function loadDetails(){ 
	$("#lastName").hide();

	/* info@mokonemediahouse.com  */
    $("#emailFirst").text("info@");
	$("#emailSecond").text("mokonemediahouse");	
	$("#emailThird").text(".com");	
  	
	/* +27 72 756 5008  */
	$("#cellFirst").text("+27 72 ");
	$("#cellSecond").text("756 ");	
	$("#cellThird").text("5008");	
}

$("#maxiConnectForm").submit(function(e){
   /* contactUsForm
   alert("#siRocRegisterForm"); */
	var valid = true;	
	
	var nameInput =$('#name');
	var nameErrorLabel =$('#nameError');
	if(nameInput.val().length > 2){
		nameErrorLabel.removeClass("invalid").addClass("valid");
	}
	else{	
		valid = false;
		nameErrorLabel.removeClass("valid").addClass("invalid");
	}
	  
	var messageInput =$('#message');
	var messageErrorLabel = $('#messageError');
	if(messageInput.val().length > 15){
		messageErrorLabel.removeClass("invalid").addClass("valid");
	}
	else{
		valid = false;
		messageErrorLabel.removeClass("valid").addClass("invalid");
	}
	 
	var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var emailInput = $('#email');
	var emailErrorLabel = $('#emailError');
	var emailValid =re.test(emailInput.val());
	if(emailValid){	
		emailErrorLabel.removeClass("invalid").addClass("valid");
	}
	else{	
		valid = false;
		emailErrorLabel.removeClass("valid").addClass("invalid");
	}
	
	var phoneNumber = $('#phoneNumber');
	var phoneNumberError = $('#phoneNumberError');
	  var cellValidation = /^\d{10}$/;
    var isCellValid = cellValidation.test(phoneNumber.val()) && phoneNumber.val().startsWith("0");
    if (isCellValid == false) {
        console.log("cell Is Not Valid!");
        phoneNumberError.removeClass("valid").addClass("invalid");
        valid = false;
    } else {
        phoneNumberError.removeClass("invalid").addClass("valid");
    }  
	
	if (valid == false){
		event.preventDefault(); 
	}
	 else{
		$("#checking").show();		
	} 
	
});

 