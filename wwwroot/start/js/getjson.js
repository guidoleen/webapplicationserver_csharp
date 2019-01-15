export class GetJson
{
    constructor(jsonres, divobj)
    {
        this.jsonres = jsonres;
        this.divobj = divobj;
    }
    getTheJson()
    {
        var xmlhttp = new XmlHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                this.divobj.innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", this.jsonres, true);
        xmlhttp.send();
    }
}