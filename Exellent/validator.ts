import {SettingLabels} from "../Definitions/Setting";
import {ExpenseFields} from "../Definitions/Expense";
import XLSX from "xlsx";

export default {};

//check if objects in input array have at least 3 props
export function hasRequiredNumOfProps(requiredNumOfProps:number, inputObj:any){
    return Object.keys(inputObj).length >= requiredNumOfProps;
}

//check if object has required fields
export function hasRequiredProps(requiredProps:any, inputObj:any){
    if(!hasRequiredNumOfProps(requiredProps.length, inputObj)) return false;
    requiredProps.forEach((prop:any) =>{
        if(!inputObj[prop]){
            return false;
        }
    })

    return true;
}

const basedate = new Date(1899, 11, 30, 0, 0, 0);
const dnthresh = basedate.getTime() + (new Date().getTimezoneOffset() - basedate.getTimezoneOffset()) * 60000;

const day_ms = 24 * 60 * 60 * 1000;
const days_1462_ms = 1462 * day_ms;

export function datenum(v:any, date1904:any) {
    let epoch = v.getTime();
    if (date1904) {
        epoch -= days_1462_ms;
    }
    return (epoch - dnthresh) / day_ms;
}
// -------------------------------------------------

export function fixImportedDate(date:any, isDate1904?:any) {
    const parsed = XLSX.SSF.parse_date_code(datenum(date, false), {date1904: isDate1904});
    // return `${parsed.y}-${parsed.m}-${parsed.d}`;
    return new Date(parsed.y, parsed.m, parsed.d, parsed.H, parsed.M, parsed.S);
}
