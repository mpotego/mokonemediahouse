/*
Created a global list to hold all the memeber details.
When valid I post the list to php on submit.
.....
All I am gonna say is that code can always be better, I think.
.....
*/

var theList = '[{"id":-1, "bottletype":"",  "quantity":"", "cell":"", "email":"", "name":""}' +
			  ',{"id":-2, "bottletype":"",  "quantity":"", "cell":"", "email":"", "name":""}' +
			  ',{"id":-3, "bottletype":"",  "quantity":"", "cell":"", "email":"", "name":""}]';
			  
/* var theList = '[{"id":1, "bottletype":"500 ml",  "quantity":"10", "cell":"0766104380", "email":"potego@yahoo.com", "name":"Potego Malatji"}' +
			  ',{"id":2, "bottletype":"1 litre",  "quantity":"12", "cell":"0766104380", "email":"potego@yahoo.com", "name":"Potego Malatji"}' +
			  ',{"id":3, "bottletype":"5 litres",  "quantity":"50", "cell":"0766104380", "email":"potego@yahoo.com", "name":"Potego Malatji"}]'; 
 */
var jsonList = $.parseJSON(theList);

var bottleSizeFirstOption = "Select Bottle Size";
 
$(document).ready(function() {

    RefreshItemList();

    LoadBottleSizeOptions();
	 
	$("#btnOpenModalSubmitFailure").hide();
	$("#btnOpenModalSubmitSuccess").hide();
});

function RefreshItemList () {

    $("#meetseOrderListDisplay").empty();

    $("#meetse-order-form #modal_id").val(''); 
    $("#meetse-order-form #modal_bottle").val(bottleSizeFirstOption);
    $("#meetse-order-form #modal_quantity").val('');

    var memberCount = 0;
	var isAdminSelected = false;
	
    for (let member in jsonList) {
        var id = jsonList[member].id; 
        var quantity = jsonList[member].quantity;
		var bottletype = jsonList[member].bottletype;
		
        if (id > 0) {
			 
            var lineItem = '<div class="blog-news-title">' +
                '<p><span >' + id + '</span>. <span>' + bottletype + '</p>' +
                '<p>Number of bottles : <span> ' + quantity + '</span> ';
		 
			lineItem += '<a onclick=OpenDetails(' + id + ') >Edit</a> <span> | </span> <a onclick=RemoveItem(' + id + ') >Remove</a></p>' +
                '</div>';

            $("#meetseOrderListDisplay").append(lineItem);
            memberCount++;
        }


    }
	 	
	if(memberCount == 3)
	{
		$("#btnOpenModal").hide();
	}
	else
	{		
        $("#btnOpenModal").show();
	}
     
}

function OpenDetails(id) {

    for (let member in jsonList) {
        var memberid = jsonList[member].id;

        if (memberid == id) { 
            var bottletype = jsonList[member].bottletype;
            var quantity = jsonList[member].quantity;
 
			console.log(bottletype);
			
            $("#meetse-order-form #modal_id").val(memberid); 
            $("#meetse-order-form #modal_bottle").val(bottletype);
            $("#meetse-order-form #modal_quantity").val(quantity);

            break;
        }
    }

    $("#btnOpenModal").click();

}

function RemoveItem(id) {

    for (let member in jsonList) {
        var memberid = jsonList[member].id;

        if (memberid == id) {

            jsonList[member].id = memberid * -1; 
            jsonList[member].bottletype = '';
            jsonList[member].quantity = '';

            break;
        }
    }

    RefreshItemList();

}

function SaveDetails() {

    if (ValidateMemberDetails() == false) {
        return;
    }

    var id = $("#meetse-order-form #modal_id").val(); 
    var bottletype = $("#meetse-order-form #modal_bottle option:selected").text();
    var quantity = $("#meetse-order-form #modal_quantity").val();
		 
	console.log('bottletype : ' + bottletype);
	console.log('quantity : ' + quantity);
	console.log('id : ' + id);
    if (id) {
        for (let member in jsonList) {

            var memberid = jsonList[member].id;


            if (memberid == id) {
 
                jsonList[member].bottletype = bottletype;
                jsonList[member].quantity = quantity;

                break;
            }
        }

        $("#btnOpenModal").click();

    } else {

        for (let member in jsonList) {

            if (jsonList[member].id < 0) {

                jsonList[member].id = jsonList[member].id * -1; 
                jsonList[member].bottletype = bottletype;
                jsonList[member].quantity = quantity;

                break;
            }
        }

        $("#btnOpenModal").click();
    }


    RefreshItemList();
}

function ValidateHeaderDetails(){

	var name = $("#name");
	var cell = $("#cell");
	var email = $("#email");

    var valid = true;	
	
    if (name.val().length < 2) {
        console.log("name IS Not VAlid!");
        name.addClass("modalInvalidInput");
        valid = false;
    } else {
        name.removeClass("modalInvalidInput");
    }

    var cellValidation = /^\d{10}$/;
    var isCellValid = cellValidation.test(cell.val()) && cell.val().startsWith("0");
    if (isCellValid == false) {
        console.log("cell Is Not Valid!");
        cell.addClass("modalInvalidInput");
        valid = false;
    } else {
        cell.removeClass("modalInvalidInput");
    }

    var emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var isEmailValid = emailValidation.test(email.val());
    if (isEmailValid == false) {
        email.addClass("modalInvalidInput");
        valid = false;
    } else {
        email.removeClass("modalInvalidInput");
    }
	
	return valid;
}

function ValidateMemberDetails() {
    
	var bottle = $("#meetse-order-form #modal_bottle");
    var quantity = $("#meetse-order-form #modal_quantity");
	var id = $("#meetse-order-form #modal_id").val(); 
	
    var valid = true;	

    if (bottle.val() == bottleSizeFirstOption) {

        console.log("Beer Is Not Valid!");
        bottle.addClass("modalInvalidInput");
        valid = false;
    } else {
        bottle.removeClass("modalInvalidInput");
    }

    if (quantity.val() < 1) {
        console.log("extra IS Not VAlid!");
        quantity.addClass("modalInvalidInput");
        valid = false;
    } else {
        quantity.removeClass("modalInvalidInput");
    }
	 
	 var _isBottleSizeValid = IsBottleSizeValid(bottle.val(), id);
	 if(_isBottleSizeValid == false)
	{
		console.log("IsBottleSizeValid IS Not VAlid!");
        bottle.addClass("modalInvalidInput");
        valid = false;
	} else {
        bottle.removeClass("modalInvalidInput");
    }
	  
    return valid;
}

function IsBottleSizeValid(bottletype, id){
	
	console.log("IsBottleSizeValid - bottletype : " + bottletype);
    
	console.log("IsBottleSizeValid - id : " + id);
	
	if(id > 0)
	{
		return true;
	}	
	
	for (let member in jsonList) {
		
		if(jsonList[member].bottletype == bottletype)
		{
			return false;	
			console.log("IsBottleSizeValid - IsBottleSizeValid : false");		
		}
		
    }
	
	console.log("IsBottleSizeValid - IsBottleSizeValid : true");
	
	return true;
}	

function LoadBottleSizeOptions() {

	console.log('LoadBottleSizeOptions');
	
    var availableBottleSizes = ["500 ml", "1 litre", "5 litres"];
 
    $.each(availableBottleSizes, function(index, value) {
       console.log('value : ' + value );
	   $("#modal_bottle").append('<option>' + value + '</option>');
       console.log('value : ' + value );
    });
	
}


function SubmitApplication() {
 
   console.log('SubmitApplication');

	if(ValidateBeforeSubmit() == false){
		return;
	}  
try{	
var jsonString = JSON.stringify(jsonList); 
 
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	
	
	
console.log(this.responseText);

  if (this.readyState == 4 && this.status == 200) {
	console.log('this.readyState == 4 && this.status == 200');
	ToggleShowPreloader(false);
	//TODO Success
	if(!this.responseText)
	{
		return;
	}
	if(this.responseText == 1)
	{	  
		console.log(this.responseText);
		$("#btnOpenModalSubmitSuccess").click();
		ReSetForm();
		
	}
	else
	{		 
	   console.log(this.responseText);
	   $("#btnOpenModalSubmitFailure").click();
	}
  } 
};
xmlhttp.open("POST", "sirocregister.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

   ToggleShowPreloader(true);

xmlhttp.send("x=" + jsonString);
}catch(exc)
{
  console.log(exc);
  $("#btnOpenModalSubmitFailure").click();
}
}

function ChangeGroupAdmin(id)
{
 if (id) {
  
 for (let member in jsonList) { 
     if (jsonList[member].id == id) { 
		 jsonList[member].isadmin = "1";         
     }
	 else
	 {		 
		 jsonList[member].isadmin = "0";   
	 }
    }
	RefreshItemList();	
   }
}

function ValidateBeforeSubmit(){
		
	$("#errorSummary").text("");
	
	var validatioErrors = ""; 
    var memberCount = 0;
	var headerValidationresult = ValidateHeaderDetails();
	
    for (let member in jsonList) 
	{ 
	  if(headerValidationresult == true){
			  
	    jsonList[member].cell = $("#cell").val();  
	    jsonList[member].name = $("#name").val();
	    jsonList[member].email = $("#email").val();
      }
	  
	  if(jsonList[member].id > 0)
	  {
		memberCount++;
	  }
	}		 
	
	if(memberCount < 1)
	{
		validatioErrors += "Make sure that you have captured atleast 1 order details record.\n" 
	}
	
	$("#errorSummary").text(validatioErrors);

	console.log('validatioErrors : ' + validatioErrors);
	console.log('headerValidationresult : ' + headerValidationresult);
	
	return   validatioErrors.length == 0 && ValidateHeaderDetails();  
}

function ReSetForm(){
 theList = '[{"id":-1, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-2, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-3, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-4, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-5, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-6, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}]';
 jsonList = $.parseJSON(theList);
 
    $("#meetseOrderListDisplay").empty();
	
	$("#name").val('');
	$("#email").val('');
	$("#cell").val('');
	
    $("#meetse-order-form #modal_id").val('');
    $("#meetse-order-form #modal_bottle").val(bottleSizeFirstOption);
    $("#meetse-order-form #modal_quantity").val('');
}

function ToggleShowPreloader(showPreloader){
	
console.log('ToggleShowPreloader' + showPreloader);

if(showPreloader == true)
{	
   console.log('showPreloader == true');
   $('#preloader').show();
   $('#status').show(); 
}
else
{
   console.log('showPreloader == false');
   $('#preloader').hide();
   $('#status').hide(); 
}
	
}