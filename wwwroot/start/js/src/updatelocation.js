var xmlhttp = new XMLHttpRequest();

export class UpdateLocation
{
    constructor(){}

    updateLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
    {
      // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
        var strdata = this.createPostDataString("locid", locid, "&");
        strdata += this.createPostDataString("latitude", latitude, "&");
        strdata += this.createPostDataString("longitude", longitude, "&");
        strdata += this.createPostDataString("bertitel", berTitle, "&");
        strdata += this.createPostDataString("bertext", berText, "&");
        strdata += this.createPostDataString("berichtid", berichtid, "&");
        strdata += this.createPostDataString("klantid", klantid, "");

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

    createPostDataString(key, value, amp)
    {
        return key + "=" + value + amp;
    }
}