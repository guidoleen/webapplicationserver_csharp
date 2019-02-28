
export class CreateHiddenInput
{
    constructor(divname)
    {
        this.divname = divname;
    }
    createHiddenInput(name, value)
    {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", name);
        input.setAttribute("value", value);

        document.getElementById(this.divname).appendChild(input);
    }
    setHiddenInput(name, value)
    {
        var inputdoc = document.getElementById(name);
        inputdoc.value = value;
    }
}