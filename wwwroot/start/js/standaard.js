function getStndrdDiv(id)
{
    return "<div id='" + id + "'></div>";
}

function getTheJson(jsonres, divobj)
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                divobj.innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", jsonres, true);
        xmlhttp.send();
    }

    function main(file, mainDiv)
    {
        var id = "dus";
        var divObj = getStndrdDiv(id);

        document.getElementById(mainDiv).innerHTML = divObj;

        getTheJson(file, document.getElementById(id));
    }