/**
 * returns 1K for 1000 and so on
 * also digits is optional and by default = 1
 * @param num
 * @param digits
 */
import {Expense} from "../../Definitions/Expense";
import {value} from "dom7";

export function nFormatter(num:number, digits:number = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function isStillSame(prev:number|string, numberNow:number){
    return prev.toString().length === numberNow.toString().length
}

export function isNumeric(str:string|number) {
    if (typeof str != "string"){
        return true;
    } // we only process strings!
    //@ts-ignore
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

/**
 * Remove indexes in indexesArray from valuesArray
 * @param valuesArr
 * @param indexesArray
 */
export function removeArrIndexes(valuesArr:Expense[], indexesArray:number[]):Expense[]{
    if(indexesArray.length<1){return valuesArr}
    let indexesSet = new Set(indexesArray);
    return valuesArr.filter((value, i) => !indexesSet.has(i));

}
