export type NumberIndexedStrings ={
    [key:number]:string;
}
export const Day: NumberIndexedStrings = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday"
}




/**
 * Subtract-able days to get current week
 * @param currentDay
 */
export function getSubtractableDays(currentDay:number):number[]{
    let days = [];
    for(let i = currentDay; i>=0;i--){
        days.push(i);
    }
    return days;
}