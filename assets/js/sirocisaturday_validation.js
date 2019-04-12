/*
Created a global list to hold all the memeber details.
When valid I post the list to php on submit.
.....
All I am gonna say is that code can always be better, I think.
.....
*/

var theList = '[{"id":-1, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-2, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-3, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-4, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-5, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-6, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}]';
/*  var theList = '[{"id":1, "name":"Potego Malatji",  "cell":"0766104380", "email":"mpotego@yahoo.com", "beer":"Heinecken" ,    "extra":0}' +     
			 ',{"id":2, "name":"Ricardo Maake",   "cell":"0766104380", "email":"Ricardo@yahoo.com", "beer":"Castle lite",   "extra":0}' +     
			 ',{"id":3, "name":"Leeroy Maila",    "cell":"0766104380", "email":"Leeroy@yahoo.com",  "beer":" Hunters Dry",  "extra":0}' +      
			 ',{"id":4, "name":"Modjadji Mashele","cell":"0766104380", "email":"Leeroy@yahoo.com",  "beer":"Flying Fish",   "extra":0}' +  
			 ',{"id":5, "name":"Katlego Makham",  "cell":"0766104380", "email":"Katlego@yahoo.com", "beer":"Amstel",        "extra":0}' +         
			 ',{"id":6, "name":"Bobhle Mailula",  "cell":"0766104380", "email":"Bobhle@yahoo.com",  "beer":"Castle Larger", "extra":0}]';   */

var jsonList = $.parseJSON(theList);

$(document).ready(function() {

    RefreshMemberList();

    LoadBearOptions();
	 
	$("#btnOpenModalSubmitFailure").hide();
	$("#btnOpenModalSubmitSuccess").hide();
});

function RefreshMemberList() {

    $("#memberDetailsDisplay").empty();

    $("#login-form #modal_id").val('');
    $("#login-form #modal_name").val('');
    $("#login-form #modal_cell").val('');
    $("#login-form #modal_email").val('');
    $("#login-form #modal_beer").val('Select Beer');
    $("#login-form #modal_extra").val('');

    var memberCount = 0;
	var isAdminSelected = false;
	
    for (let member in jsonList) {
        var id = jsonList[member].id;
        var name = jsonList[member].name;
        var cell = jsonList[member].cell;
        var email = jsonList[member].email;
        var beer = jsonList[member].beer;
        var extra = jsonList[member].extra;
		var isadmin = jsonList[member].isadmin;
		
        if (id > 0) {
			
			if(extra)
			{
				extra = extra;
			}
			else
			{
				extra = 0;
			}

            var lineItem = '<div class="blog-news-title">' +
                '<p><span >' + id + '</span>. <span>' + name + '</span> , <span>' + cell + '</span> , <span>' + email + '</span> </p>' +
                '<p><span>' + beer + '</span> - Extra six pack : <span> ' + extra + '</span> ';
			if(isadmin == "1")
			{
				isAdminSelected = isadmin;
				lineItem += '<input type="checkbox"  onclick="ChangeGroupAdmin(' + id + ')" class="adminCheckBox" checked> Group Admin </input>'
			}
			else
			{
				lineItem += '<input type="checkbox"  onclick="ChangeGroupAdmin(' + id + ')" class="adminCheckBox"> Group Admin </input>'
			}
			lineItem += '<a onclick=OpenMemberDetails(' + id + ') >Edit</a> <span> | </span> <a onclick=RemoveMember(' + id + ') >Remove</a></p>' +
                '</div>';

            $("#memberDetailsDisplay").append(lineItem);
            memberCount++;
        }


    }
	
	if(memberCount == 6 && !isAdminSelected)
	{ 
		$("#memberDetailsDisplay input:checkbox").addClass("adminCheckBoxError");
		$("#selectAdminErrorDiv").show();
	}	
	else
	{ 
		$("#memberDetailsDisplay input:checkbox").removeClass("adminCheckBoxError");
		$("#selectAdminErrorDiv").hide();
	}			
	
	if(memberCount == 6)
	{
		$("#btnOpenModal").hide();
	}
	else
	{		
        $("#btnOpenModal").show();
	}

    if (memberCount == 6 && isAdminSelected) 
	{
         $("#btnSubmitForm").show();
       
    }
	else 
	{
         $("#btnSubmitForm").hide();
    }  
}

function OpenMemberDetails(id) {

    for (let member in jsonList) {
        var memberid = jsonList[member].id;

        if (memberid == id) {
            var name = jsonList[member].name;
            var cell = jsonList[member].cell;
            var email = jsonList[member].email;
            var beer = jsonList[member].beer;
            var extra = jsonList[member].extra;

            $("#login-form #modal_id").val(memberid);
            $("#login-form #modal_name").val(name);
            $("#login-form #modal_cell").val(cell);
            $("#login-form #modal_email").val(email);
            $("#login-form #modal_beer").val(beer);
            $("#login-form #modal_extra").val(extra);

            break;
        }
    }

    $("#btnOpenModal").click();

}

function RemoveMember(id) {

    for (let member in jsonList) {
        var memberid = jsonList[member].id;

        if (memberid == id) {

            jsonList[member].id = memberid * -1;
            jsonList[member].name = '';
            jsonList[member].cell = '';
            jsonList[member].email = '';
            jsonList[member].beer = '';
            jsonList[member].extra = '';

            break;
        }
    }

    RefreshMemberList();

}

function SaveMemberDetails() {

    if (ValidateMemberDetails() == false) {
        return;
    }

    var id = $("#login-form #modal_id").val();
    var name = $("#login-form #modal_name").val();
    var cell = $("#login-form #modal_cell").val();
    var email = $("#login-form #modal_email").val();
    var beer = $("#login-form #modal_beer option:selected").text();
    var extra = $("#login-form #modal_extra").val();

    if (id) {
        for (let member in jsonList) {

            var memberid = jsonList[member].id;


            if (memberid == id) {

                jsonList[member].name = name;
                jsonList[member].cell = cell;
                jsonList[member].email = email;
                jsonList[member].beer = beer;
                jsonList[member].extra = extra;

                break;
            }
        }

        $("#btnOpenModal").click();

    } else {

        for (let member in jsonList) {

            if (jsonList[member].id < 0) {

                jsonList[member].id = jsonList[member].id * -1;
                jsonList[member].name = name;
                jsonList[member].cell = cell;
                jsonList[member].email = email;
                jsonList[member].beer = beer;
                jsonList[member].extra = extra;

                break;
            }
        }

        $("#btnOpenModal").click();
    }


    RefreshMemberList();
}

function ValidateMemberDetails() {

    var name = $("#login-form #modal_name");
    var cell = $("#login-form #modal_cell");
    var email = $("#login-form #modal_email");
    var beer = $("#login-form #modal_beer");
    var extra = $("#login-form #modal_extra");

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

    if (beer.val() == 'Select Beer') {

        console.log("Beer IS Not VAlid!");
        beer.addClass("modalInvalidInput");
        valid = false;
    } else {
        beer.removeClass("modalInvalidInput");
    }

    if (extra.val() < 0) {
        console.log("extra IS Not VAlid!");
        extra.addClass("modalInvalidInput");
        valid = false;
    } else {
        extra.removeClass("modalInvalidInput");
    }


    return valid;
}

function LoadBearOptions() {

    var availableBeers = ["Strongbow", "Bernin", "Castle Lager", "Castle Lite", "Castle Draught", "Castle Milk Stout", "Windhoek Lager", "Windhoek Draught", "Hansa", "Carling Black Label", "Miller Genuine Draft", "Peroni Nastro Azzurro", "Savannah", "Flying Fish", "Heineken", "Extreme", "Hunters Dry", "Hunters Gold", "Stella"];

    availableBeers.sort();

    $.each(availableBeers, function(index, value) {
        $("#modal_beer").append('<option>' + value + '</option>');
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
	RefreshMemberList();	
   }
}

function ValidateBeforeSubmit(){
		
	$("#errorSummary").text("");
	
	var validatioErrors = ""; 
    var memberCount = 0;
	var isAdminSelected = false;
    var groupName = $("#Group_Name").val();
	
    for (let member in jsonList) 
	{   
		 
      if(jsonList[member].isadmin == "1")
      {
		  console.log("Group_Name : " + groupName);
		jsonList[member].groupname = groupName;  
      	isAdminSelected = true;			
      }
	
	memberCount++;
	
	}		 
	
	if(memberCount != 6)
	{
		validatioErrors += "Make sure that you have captured 6 members.\n" 
	}
	
	if(!isAdminSelected)
	{
		validatioErrors += "Make sure that you have selected a group admin.\n" 
	}
	
	if(groupName.length <= 4)
	{
		validatioErrors += "Make sure that your have captured group name. Group name must be at least 4 characters.\n";
	}
	
	console.log('validatioErrors : ' + validatioErrors);
	$("#errorSummary").text(validatioErrors);
		
	return   validatioErrors.length == 0;  
}

function ReSetForm(){
 theList = '[{"id":-1, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-2, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-3, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-4, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-5, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}' +
			  ',{"id":-6, "name":"",  "cell":"", "email":"", "beer":"", "extra":0, "isadmin":"0", "groupname":""}]';
 jsonList = $.parseJSON(theList);
 
    $("#memberDetailsDisplay").empty();
	$("#Group_Name").val('');
	
    $("#login-form #modal_id").val('');
    $("#login-form #modal_name").val('');
    $("#login-form #modal_cell").val('');
    $("#login-form #modal_email").val('');
    $("#login-form #modal_beer").val('Select Beer');
    $("#login-form #modal_extra").val('');
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