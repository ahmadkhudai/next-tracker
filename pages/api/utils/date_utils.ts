// @ts-ignore


import moment from "moment";

export const addHours = (givenTime:Date, hours:number)=>{
    return new Date(((givenTime).setHours(givenTime.getHours() + hours)));
}

export function randomIntFromInterval(min:number, max:number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomItem(items:any[]){
    return items[Math.floor(Math.random()*items.length)]
}
export const addDays = (givenDate:Date, days:any=null)=>{
    if(days===0){
        return givenDate;
    }
    if(!days){
        days = randomIntFromInterval(-1,-30);
    }
    let tempDate = givenDate;
    return new Date((givenDate).setHours(givenDate.getDay() +(days * 24)));
}



export function getISODate(date:Date) {
    return date.toISOString().split('.')[0];
}

export function getDateString(date:any){
    if(typeof date === "string"){return (new Date(date)).toDateString()}
    return date.toDateString();
}


export function getLocaleTimeString(date:any){
    if(typeof date === "string"){return (new Date(date)).toLocaleTimeString()}
    return date.toLocaleTimeString();
}

export function getDate(date:any){
    if(typeof  date === "string" || date==="number") return new Date(date);
    return date;
}

export function isToday(inputDate:any){
    return getDate(inputDate).setHours(0,0,0,0) === (new Date()).setHours(0,0,0,0);
}


export function isGreaterThanToday(inputDate:Date|String){
    return getDate(inputDate).setHours(0,0,0,0) > (new Date()).setHours(0,0,0,0);
}

export function concat(date: Date, time: string) {
    return moment(date).format("YYYY-MM-DD") + "T" + time;
}

export function concatTimeToDate(date: Date, oldDate: Date) {
    return concat(date, moment(oldDate).format("HH:mm"));
}

export function addDaysPreserveTime(date: Date, number: number, oldDate: Date) {
    let newDate: Date = new Date(moment(date).add(number, "days").toString());
    return concatTimeToDate(newDate, oldDate);
}