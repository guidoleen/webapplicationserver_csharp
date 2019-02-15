var xmlhttp = new XMLHttpRequest();

export class UpdateLocation
{
    constructor(){}

    updateLocation(url, klantid, berTitle, berText)
    {
        
        var params = klantid + berTitle + berText;
        
        // http.withCredentials = true;

        xmlhttp.onreadystatechange = function() 
        {
            console.log(xmlhttp.readyState);
            console.log(xmlhttp.status);

            if(this.readyState == 4 && this.status == 204)
            {
                console.log(xmlhttp.responseText + "Bla" + params);
            }
        }

        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //Send the proper header information along with the request
        xmlhttp.send(params);

        ///
        var XHR = new XMLHttpRequest();
        XHR.withCredentials = true;
        XHR.onreadystatechange = function() {
          if (XHR.readyState == 4) {
            if(XHR.status == 200) {
              console.log("IT WORKED!");
            } else {
              console.log("ummm something is wrong");
            }
          }
        };
        XHR.open("POST", url);
        XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var data = "username=";
        XHR.send(data);
    }
}