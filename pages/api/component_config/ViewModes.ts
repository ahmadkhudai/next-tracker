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
    [ViewModes.week]: (obj: any) => obj.date,
    [ViewModes.month]: (obj: any) => moment(obj.date).format("MM/DD")
}

export enum swiperPosition {
    "left",
    "center",
    "right",

}

export function isValidSliderState(sliderState:any) {


    if (sliderState[swiperPosition.left] == sliderState[swiperPosition.center]) {
        return false;
    }

    if (sliderState[swiperPosition.right] == sliderState[swiperPosition.center]) {
        return false;
    }

    if (sliderState[swiperPosition.left] == sliderState[swiperPosition.right]) {
        return false;
    }
    return true;
}


/**
 * This function only needs center view mode (the current one)
 * because we cannot change the current, so we fix the left and
 * right.
 * @param center
 */
export function repairSwiperState({center}: { center: ViewModes }) {
    let left: ViewModes = ViewModes.week !== center ? ViewModes.week : ViewModes.today;
    return {
        [swiperPosition.left]: left,
        [swiperPosition.center]: center,
        //if left is today, that means center is week. the only other option is month
        //also if left is not today, then it MUST be week. so we have today and month.
        //we have to compare with center
        [swiperPosition.right]: left === ViewModes.today ? ViewModes.month : (center === ViewModes.month ? ViewModes.today : ViewModes.month)
    }
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