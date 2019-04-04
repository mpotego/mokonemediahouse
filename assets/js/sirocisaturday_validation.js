/*
Created a global list to hold all the memeber details.
When valid I post the list to php on submit.
.....
All I am gonna say is that code can always be better, I think.
.....
*/

var theList = '[{"id":-1, "name":"",  "cell":"", "email":"", "beer":"", "extra":0}' +
    ',{"id":-2, "name":"",  "cell":"", "email":"", "beer":"", "extra":0}' +
    ',{"id":-3, "name":"",  "cell":"", "email":"", "beer":"", "extra":0}' +
    ',{"id":-4, "name":"",  "cell":"", "email":"", "beer":"", "extra":0}' +
    ',{"id":-5, "name":"",  "cell":"", "email":"", "beer":"", "extra":0}' +
    ',{"id":-6, "name":"",  "cell":"", "email":"", "beer":"", "extra":0}]';
 /* '[{"id":1, "name":"Potego Malatji",  "cell":"0766104380", "email":"mpotego@yahoo.com", "beer":"Heinecken" ,    "extra":0}' +     
			 ',{"id":2, "name":"Ricardo Maake",   "cell":"0766104380", "email":"Ricardo@yahoo.com", "beer":"Castle lite",   "extra":0}' +     
			 ',{"id":3, "name":"Leeroy Maila",    "cell":"0766104380", "email":"Leeroy@yahoo.com",  "beer":" Hunters Dry",  "extra":0}' +      
			 ',{"id":4, "name":"Modjadji Mashele","cell":"0766104380", "email":"Leeroy@yahoo.com",  "beer":"Flying Fish",   "extra":0}' +  
			 ',{"id":5, "name":"Katlego Makham",  "cell":"0766104380", "email":"Katlego@yahoo.com", "beer":"Amstel",        "extra":0}' +         
			 ',{"id":6, "name":"Bobhle Mailula",  "cell":"0766104380", "email":"Bobhle@yahoo.com",  "beer":"Castle Larger", "extra":0}]';  


*/
/**/

var jsonList = $.parseJSON(theList);

$(document).ready(function() {

    RefreshMemberList();

    LoadBearOptions();
	
	//$("#btnSubmitForm").click(SubmitApplication());

});

function RefreshMemberList() {

    $("#memberDetailsDisplay").empty();

    $("#login-form #modal_id").val('');
    $("#login-form #modal_name").val('');
    $("#login-form #modal_cell").val('');
    $("#login-form #modal_email").val('');
    $("#login-form #modal_beer").val('');
    $("#login-form #modal_extra").val('');

    var memberCount = 0;

    for (let member in jsonList) {
        var id = jsonList[member].id;
        var name = jsonList[member].name;
        var cell = jsonList[member].cell;
        var email = jsonList[member].email;
        var beer = jsonList[member].beer;
        var extra = jsonList[member].extra;

        if (id > 0) {

            var lineItem = '<div class="blog-news-title">' +
                '<p><span >' + id + '</span>. <span>' + name + '</span> , <span>' + cell + '</span> , <span>' + email + '</span> </p>' +
                '<p><span>' + beer + '</span> - Extra six pack : <span> ' + extra + '</span> ' +
                '<a onclick=OpenMemberDetails(' + id + ') >Edit</a> <span> | </span> <a onclick=RemoveMember(' + id + ') >Remove</a></p>' +
                '</div>';

            $("#memberDetailsDisplay").append(lineItem);
            memberCount++;
        }


    }

         if (memberCount == 6) {
               $("#btnSubmitForm").show();
               $("#btnOpenModal").hide();
           } else {
               $("#btnSubmitForm").hide();
               $("#btnOpenModal").show();
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
        console.log("cell IS Not VAlid!");
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
	
var jsonString = JSON.stringify(jsonList); 
 
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   /*  myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      txt += myObj[x].name + "<br>";
    } */
    //alert( this.responseText);
  //TODO Success
  }else
  {
   //TODO Failure 
  }
};
xmlhttp.open("POST", "sirocregister.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + jsonString);

}
