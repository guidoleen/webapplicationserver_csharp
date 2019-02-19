var xmlhttp = new XMLHttpRequest();

export class UpdateLocation
{
    constructor(){}

    updateLocation(url, klantid, berTitle, berText)
    {
        
        var params = klantid + berTitle + berText;
        
        var data = {};
        data.klantid = klantid;
        data.titel = berTitle;
        data.text  = berText;
        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () 
        {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == xhr.DONE && xhr.status == "204") 
            {
              console.log("Klaar");
            } else {
              console.log("Error in de verbinding...");
            }
        }
        xhr.send(json);
    }
}