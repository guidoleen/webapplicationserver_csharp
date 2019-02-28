export class UtilConfertDecimalToString
{
    convertdecimalstring(number)
    {
        var no1 = Math.floor(number);
        var no2 = number - no1;
        no2 = no2.toString();
        no1 = no1.toString();

        return no1 + "," + no2.substring(2, (no2.length-1));
    }
}