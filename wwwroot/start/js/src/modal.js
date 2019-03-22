import { MarkersEvents } from './markersevents';

export class Modal
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
        strForm += "<span class=''>User</span>";
        strForm += "<input id='email' type='text' class='input-txt mrg-bottom'><br>";
        strForm += "<span class=''>Password</span>";
        strForm += "<input id='pwd' type='password' class='input-txt mrg-bottom'>";
        strForm += "<a id='login' class='input-button mrg-bottom' onclick='loginThis();'>Login</a>";
        strForm += "</form>";

        return strForm;
    }

    setLogOutButton()
    {
        return "<a id='logout' class='input-button delete-button mrg-bottom' onclick='logOutThis();'>LogOut</a>";
    }

    setDivOverallModal(h3)
    {
        var overallDiv = document.getElementById("modal");

        var modalCentreDiv = document.createElement("div");
        modalCentreDiv.className = "modal-centrediv";

            var modalDiv = document.createElement("div");
            modalDiv.className = "modal-modaldiv";
            modalDiv.innerHTML = this.setCloseX() + this.setH3(h3) + this.setLoginForm() + this.setLogOutButton();

        var modalDivBack = document.createElement("div");
        modalDivBack.className = "modal-modaldiv-backgr";

        modalCentreDiv.appendChild(modalDiv);
        overallDiv.appendChild(modalCentreDiv);
        overallDiv.appendChild(modalDivBack);

        this.setEventClose();
    }

    setEventClose()
    {
        document.getElementById("modal_closer").addEventListener("click", function()
        {
            document.getElementById("modal").style.display = "none";
        });
    }
    setEventOpen()
    {
        document.getElementById("modal_closer").addEventListener("click", function()
        {
            document.getElementById("modal").style.display = "block";
        });
    }
}