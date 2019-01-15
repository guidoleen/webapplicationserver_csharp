import { GetJson } from './getjson';
import { UiStandardDiv } from './ui_standarddiv';

class FillAppJson
{
    main(mainDiv)
    {
        var id = "dus";
        var divObj = new UiStandardDiv().getStndrdDiv(id);

        document.getElementById(mainDiv).innerHTML = divObj;

        var jsonDo = new GetJson("", document.getElementById(id));
        jsonDo.getTheJson();
    }
}
