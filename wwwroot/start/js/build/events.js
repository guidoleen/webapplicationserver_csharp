// THIS SCRIPT USES THE SAVE, DELETE AND UPDATE FUNCTION IN THE POPUP...

'use strict';
// UTILS
class UtilFindAdresBarParam
{
    constructor(){};

    findGetParameter(parameterName) 
    {
        var result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
}

///// Cookie Class
class Cookie
{
    setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
        return "";
    }

    deleteCookie()
    {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
} 

// GLOBALS CONSANTS
var URL = "http://localhost:63744/api/location/";
var URL2 = "http://localhost:63744/api/location/";
var URL_KLANT = "http://localhost:63744/api/klant/";

var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
var KLANTID; // utilparm.findGetParameter('klantid');
var C_LAT = utilparm.findGetParameter('lat');
var C_LON = utilparm.findGetParameter('lon');
var ZOOM = utilparm.findGetParameter('zoom');

var COOKIE_EXPR = 20; // Day's

// CLASS SECTION
    class CreateHiddenInput
    {
        constructor(divname)
        {
            this.divname = divname;
        }
        createHiddenInput(name, value)
        {
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("id", name);
            input.setAttribute("name", name);
            input.setAttribute("value", value);

            document.getElementById(this.divname).appendChild(input);
        }
        setHiddenInput(name, value)
        {
            var inputdoc = document.getElementById(name);
            inputdoc.value = value;
        }
        getInputValue(name)
        {
            var inputdoc = document.getElementById(name);
            return inputdoc.value;
        }
    }

//// Update Location
    var xmlhttp = new XMLHttpRequest();

    class UpdateLocation
    {
        constructor(){}
    
        updateLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
        {
          // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
            var strdata = new CreatePostDataString().createPostDataString("locid", locid, "&");
            strdata += new CreatePostDataString().createPostDataString("latitude", latitude, "&");
            strdata += new CreatePostDataString().createPostDataString("longitude", longitude, "&");
            strdata += new CreatePostDataString().createPostDataString("bertitel", berTitle, "&");
            strdata += new CreatePostDataString().createPostDataString("bertext", berText, "&");
            strdata += new CreatePostDataString().createPostDataString("berichtid", berichtid, "&");
            strdata += new CreatePostDataString().createPostDataString("klantid", klantid, "");
    
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
            xhr.onload = function () 
            {
                if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                {
                  console.log(xhr.response + " " + strdata);
                } else {
                  console.log("Error in de verbinding...");
                }
            }
            xhr.send(strdata);
        }
    }

///// INSERT Class
class InsertLocation
    {
        constructor(){}
    
        insertLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
        {
          // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
            var strdata = new CreatePostDataString().createPostDataString("locid", locid, "&");
            strdata += new CreatePostDataString().createPostDataString("latitude", latitude, "&");
            strdata += new CreatePostDataString().createPostDataString("longitude", longitude, "&");
            strdata += new CreatePostDataString().createPostDataString("bertitel", berTitle, "&");
            strdata += new CreatePostDataString().createPostDataString("bertext", berText, "&");
            strdata += new CreatePostDataString().createPostDataString("berichtid", berichtid, "&");
            strdata += new CreatePostDataString().createPostDataString("klantid", klantid, "");
    
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
            xhr.onload = function () 
            {
                if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                {
                  console.log(xhr.response + " " + strdata);
                } else {
                  console.log("Error in de verbinding...");
                }
            }
            xhr.send(strdata);
        }
    }

    ///// INSERT Class
class DeleteLocation
{
    constructor(){}

    deleteLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
    {
      // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
        var strdata = new CreatePostDataString().createPostDataString("locid", locid, "&");
        strdata += new CreatePostDataString().createPostDataString("latitude", latitude, "&");
        strdata += new CreatePostDataString().createPostDataString("longitude", longitude, "&");
        strdata += new CreatePostDataString().createPostDataString("bertitel", berTitle, "&");
        strdata += new CreatePostDataString().createPostDataString("bertext", berText, "&");
        strdata += new CreatePostDataString().createPostDataString("berichtid", berichtid, "&");
        strdata += new CreatePostDataString().createPostDataString("klantid", klantid, "");

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
        xhr.onload = function () 
        {
            if (xhr.readyState == xhr.DONE && xhr.status == "200") 
            {
              console.log(xhr.response + " " + strdata);
            } else {
              console.log("Error in de verbinding...");
            }
        }
        xhr.send(strdata);
    }
}

    class CreatePostDataString
    {
        createPostDataString(key, value, amp)
        {
            return key + "=" + value + amp;
        }
    }

// LOGIN class
        class Login
        {
            constructor(){}
    
            login(url, klantid, email, pwd)
            {
                var strdata = new CreatePostDataString().createPostDataString("klantid", klantid, "&");
                strdata += new CreatePostDataString().createPostDataString("email", email, "&");
                strdata += new CreatePostDataString().createPostDataString("pwd", pwd, "");
    
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
                xhr.onload = function () 
                {
                    if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                    {
                        var strjson = JSON.parse(xhr.response);
                        strjson = JSON.parse(strjson);

                        crHinput.setHiddenInput("sessionid", strjson[0].sessionid);
                        crHinput.setHiddenInput("sessiontoken", strjson[0].sessiontoken);

                        new Cookie().setCookie("klantid", strjson[0].klantid, COOKIE_EXPR);
                        new Cookie().setCookie("sessionid", strjson[0].sessionid, COOKIE_EXPR);
                        new Cookie().setCookie("sessiontoken", strjson[0].sessiontoken, COOKIE_EXPR);

                        reloadMap();
                    } 
                    else 
                    {
                        console.log("Error in de verbinding...");
                    }
                }
                xhr.send(strdata);
            }
        }

//// SIGN IN klant Class
class Signin
{
    constructor(){}

    signin(url, naam, pwd, email)
    {
            var strdata = new CreatePostDataString().createPostDataString("naam", naam, "&");
                strdata += new CreatePostDataString().createPostDataString("pwd", pwd, "&");
                strdata += new CreatePostDataString().createPostDataString("email", email, "");
    
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
                xhr.onload = function () 
                {
                    if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                    {
                        var strjson = JSON.parse(xhr.response);
                        strjson = JSON.parse(strjson);

                        // Melding goed of fout....

                        reloadMap();
                    } 
                    else 
                    {
                        console.log("Error in de verbinding...");
                    }
                }
                xhr.send(strdata);
    }
}

//// Modal Class
class Modal
{
    constructor()
    {
    }

    setCloseX()
    {
        return "<div id='modal_closer' class='ol-popup-closer'></div>";
    }

    setH3(strTitle)
    {
        return "<h3 class='ol-popup-h3'>" + strTitle + "</h3>";
    }

    setP(strText)
    {
        return "<p class='ol-popup-p'>" + strText + "</p>";
    }

    setLoginForm()
    {
        var strForm = "<form>";
        strForm += "<div class='form-container'>";
        strForm += "<div class='col-2'>User</div>";
        strForm += "<div class='col-4'>";
        strForm += "<input id='email' type='text' class='input-txt mrg-bottom'><br>";
        strForm += "</div>";
        strForm += "<div class='col-2'>Password</div>";
        strForm += "<div class='col-4'>";
        strForm += "<input id='pwd' type='password' class='input-txt mrg-bottom'>";
        strForm += "</div>";
        strForm += "<a id='login' class='input-button mrg-bottom' onclick='loginThis();'>Login</a>";
        strForm += "</div>";
        strForm += "</form>";

        return strForm;
    }

    setSigninForm()
    {
        var strForm = "<form>";
        strForm += "<div class='form-container'>";
        strForm += "<div class='col-2'>Naam</div>";
        strForm += "<div class='col-4'>";
        strForm += "<input id='naam' type='text' class='input-txt mrg-bottom'><br>";
        strForm += "</div>";
        strForm += "<div class='col-2'>Email</div>";
        strForm += "<div class='col-4'>";
        strForm += "<input id='email' type='text' class='input-txt mrg-bottom'><br>";
        strForm += "</div>";
        strForm += "<div class='col-2'>Password</div>";
        strForm += "<div class='col-4'>";
        strForm += "<input id='pwd' type='password' class='input-txt mrg-bottom'>";
        strForm += "</div>";
        strForm += "<a id='login' class='input-button mrg-bottom' onclick='SigninThis();'>SignIn</a>";
        strForm += "</div>";
        strForm += "</form>";

        return strForm;
    }

    setLogOutButton()
    {
        return "<a id='logout' class='input-button delete-button mrg-bottom' onclick='logOutThis();'>LogOut</a>";
    }

    setCancelButton()
    {
        return "<div class='col-4' style='width: 33%'><a id='cancelmodal' class='input-button delete-button mrg-bottom'>Cancel</a></div>";
    }

    modalMaker(h3, form, maxH)
    {
        var overallDiv = document.getElementById("modal");
        overallDiv.style.height = "100%";

        var modalCentreDiv = document.createElement("div");
        modalCentreDiv.className = "modal-centrediv";

            var modalDiv = document.createElement("div");
            modalDiv.className = "modal-modaldiv";
            modalDiv.style.maxHeight = maxH + "px";
            modalDiv.innerHTML = this.setCloseX() + this.setH3(h3) + form + this.setCancelButton();

        var modalDivBack = document.createElement("div");
        modalDivBack.className = "modal-modaldiv-backgr";

        modalCentreDiv.appendChild(modalDiv);
        overallDiv.appendChild(modalCentreDiv);
        overallDiv.appendChild(modalDivBack);

        this.setEventClose();
    }

    // Login Modal
    setLoginDivOverallModal(h3)
    {
        this.modalMaker(h3, this.setLoginForm(), 250);
    }

    // Signin Modal
    setSigninDivOverallModal(h3)
    {
        this.modalMaker(h3, this.setSigninForm(), 300);
    }

    setEventClose()
    {
        document.getElementById("modal_closer").addEventListener("click", function()
        {
            document.getElementById("modal").style.display = "none";
        });
    }
    setEventDisplayModal()
    {
        document.getElementById("modal").style.display = "block";
    }

    setEventCancelModal()
    {
        document.getElementById("cancelmodal").addEventListener("click", function()
        {
            document.getElementById("modal").style.display = "none";
        });
    }
    clearModal()
    {
        document.getElementById("modal").innerHTML = "";
    }
}

//// Util Class
    var crHinput = new CreateHiddenInput();
    class XtraJs
    {

        // Save PopUp
        savePopUpInfo()
        {
            var locid = crHinput.getInputValue("locid");
            var latitude = crHinput.getInputValue("latitude");
            var longitude = crHinput.getInputValue("longitude");
            var berTitle = this.checkIfFormInputEmpty(crHinput.getInputValue("form_title"), "bertitel");
            var berText = this.checkIfFormInputEmpty(crHinput.getInputValue("form_bertext"), "bertext");
            var berichtid = crHinput.getInputValue("berichtid");

            var insertYN = parseInt(document.getElementById(crHinput.getInputValue("insert")).dataset.insert);
            if( insertYN == 1 ) // INSERT = 1
            {
                locid = 0;
                new InsertLocation().insertLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
            }
            if( insertYN == 0 ) // UPDATE = 0
            {
                new UpdateLocation().updateLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
            }

            reloadMap();
        }

        // Delete Marker
        deleteMarker()
        {
            var locid = crHinput.getInputValue("locid");
            var latitude = 0;
            var longitude = 0;
            var berTitle = "";
            var berText = "";
            var berichtid = crHinput.getInputValue("berichtid");

            var insertYN = document.getElementById(crHinput.getInputValue("insert")).dataset.insert;
            if( insertYN == 0 )
            {
                new DeleteLocation().deleteLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
                reloadMap();
            }
        }

        // Login Member
        loginMember()
        {
            var email = crHinput.getInputValue("email");
            var pwd = crHinput.getInputValue("pwd");
            
            // Then login for a new session in db
            new Login().login(URL + "0/1", KLANTID, email, pwd); // 1 == login in C#
        }

        logoutMember()
        {
            var email = "";
            var pwd = "";

            KLANTID = new Cookie().getCookie('klantid');
            if( KLANTID == undefined || KLANTID == 0 ) KLANTID = 0;

            new Login().login(URL + KLANTID + "/0", KLANTID, email, pwd); // 0 == logout in C#
            new Cookie().deleteCookie();
        }

        // SignIn Member
        signinMember()
        {
            var naam = crHinput.getInputValue("naam");
            var pwd = crHinput.getInputValue("pwd");
            var email = crHinput.getInputValue("email");

            new Signin().signin(URL_KLANT, naam, pwd, email);

            // reloadMap();
        }

        checkIfFormInputEmpty(value, altrnValue)
        {
            if( value == "" )
            {
                return crHinput.getInputValue(altrnValue);
            }
            else 
                return value;
        }
    }

    // Call functions
    function save()
    {
        new XtraJs().savePopUpInfo();
    }

    function deleteThis()
    {
        new XtraJs().deleteMarker();
    }

    function loginThis()
    {
        new XtraJs().loginMember();
    }
    
    function logOutThis()
    {
        new XtraJs().logoutMember();
    }

    function SigninThis()
    {
        new XtraJs().signinMember();
    }

    // Modal functions Events
    var loginModalOn = 0;
    function logInModalThis()
    {
        var modal = new Modal();
        modal.clearModal();

        if(loginModalOn == 0)
        {
            modal.setLoginDivOverallModal("Login");
            modal.setEventCancelModal();
        }
        else
        {
            modal.setLoginDivOverallModal("Login");
            modal.setEventCancelModal();
            modal.setEventDisplayModal();
        }
        loginModalOn++;
    }

    var signinModalOn = 0;
    function SignInModalThis()
    {
        var modal = new Modal();
        modal.clearModal();

        if(signinModalOn == 0)
        {
            modal.setSigninDivOverallModal("Signin");
            modal.setEventCancelModal();
        }
        else
        {  
            modal.setSigninDivOverallModal("Signin");
            modal.setEventCancelModal();
            modal.setEventDisplayModal();
        }
        signinModalOn++;
    }

    function reloadMap()
    {
        // window.location.replace("index.html");
        // window.location.href = "index.html?klantid=" + KLANTID + "&" +
        window.location.href = "index.html?" + 
        "lat=" + crHinput.getInputValue("C_HLAT") + "&" +
        "lon=" + crHinput.getInputValue("C_HLON") + "&" +
        "zoom=" + crHinput.getInputValue("zoom");
    }