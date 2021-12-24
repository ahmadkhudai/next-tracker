import {NumberIndexedStrings} from "../../../constants/day";
import exp from "constants";


export enum ViewModes{
    "today"="today",
    "week"="week",
    "month"="month"
}
export const ViewModesDir:NumberIndexedStrings={
    0:ViewModes.today,
    1:ViewModes.month,
    2:ViewModes.week
}


//
export function getNextViewMode(currentViewMode:number):ViewModes{
    return ViewModesDir[currentViewMode%3] as ViewModes;
}
//     for (let viewModesKey in ViewModes) {
//         //@ts-ignore
//         if(ViewModes[viewModesKey]!==currentViewMode){
//             //@ts-ignore
//             return ViewModes[viewModesKey];
//         }
//     }
//     return currentViewMode;
// }