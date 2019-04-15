export class Navigation
{
    constructor(navInfo)
    {
        this.navInfo = navInfo;
    }
    setNavigationBar()
    {
        var objEl = document.getElementById(this.navInfo.El);
        objEl.innerHTML = this.createLogo() + this.createNavList() + this.createBackgrnd();
    }
    createLogo()
    {
        return "<div class='logo'>" + this.navInfo.logo + "</div>";
    }
    createNavList()
    {
        var arrUl = this.navInfo.NavList;
        var strNavList = "<ul class='nav-list'>";
        for (var index = 0; index < arrUl.length; index++) 
        {
            strNavList += this.createLi(arrUl[index].val, arrUl[index].call);
        }
        strNavList += "</ul>";
        return strNavList;
    }
    createLi(strVal, jsCall)
    {
        return "<li class='nav-list-item'><div onclick='" + jsCall + "'>" + strVal + "</div></li>";
    }

    createBackgrnd()
    {
        return "<div class='nav-backgrnd'></div>";
    }
}