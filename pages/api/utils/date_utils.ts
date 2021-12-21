// @ts-ignore


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
