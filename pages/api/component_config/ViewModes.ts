import {NumberIndexedStrings} from "../../../constants/day";
import moment from "moment";


export enum ViewModes {
    "today" = "today",
    "week" = "week",
    "month" = "month"
}

export const ViewModesDir: NumberIndexedStrings = {
    0: ViewModes.today,
    1: ViewModes.month,
    2: ViewModes.week
}

export const dateFunctions = {

    [ViewModes.today]: (obj: any) => moment(obj.date).format("hh:mm a"),
    [ViewModes.week]: (obj: any) => moment(obj.date).format("DD ddd"),
    [ViewModes.month]: (obj: any) => moment(obj.date).format("MM/DD")
}


//
export function getNextViewMode(currentViewMode: number): ViewModes {
    return ViewModesDir[currentViewMode % 3] as ViewModes;
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
