import {v4 as uuidv4} from 'uuid';
import {addDays, getRandomItem, randomIntFromInterval} from "../utils/date_utils";
import {Expense} from "../../Definitions/Expense";
import exp from "constants";

let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special", "apple", "sneakers", "jacket", "cocomo", "oreo", "zinger"];
let locations = ["cafe", "uni cafe", "KFC", "GB", "kk", "quetta cafe", "std corner", "peshawar shinwari", "hujra"];

function randomExpense(): Expense {
    let price = randomIntFromInterval(30, 200);
    let  name=getRandomItem(itemsList);
    let location = getRandomItem(locations);
    return {...{id: ("ak_sample_data"+uuidv4()), price:price, description: price + " spent on "+name+" from "+location,
            name:name,location:location, date: (addDays(new Date(),randomIntFromInterval(-30,30))).toString()}};
}

function getRandomExpenses(amount:number):Expense[]{
    let expenses = []
    for(let i=0; i<amount; i++){
        expenses.push(randomExpense());
    }
    return expenses;
}

export const dumdumData = getRandomExpenses(400);
// export const dumdumData = [
//     {id: "1", name: getRandomItem(itemsList), price: 30, description: "chai", date: (addDays(new Date(), 20))},
//     {id: "3", name: getRandomItem(itemsList), price: 170, description: "Shwarma", date: (addDays(new Date()))},
//     {id: "4", name: getRandomItem(itemsList), price: 30, description: "chai", date: (addDays(new Date()))},
//     {id: "5", name: getRandomItem(itemsList), price: 300, description: "Steak Burger", date: (addDays(new Date()))},
//     {id: "7", name: getRandomItem(itemsList), price: 30, description: "chai", date: (addDays(new Date()))},
//     {id: "8", name: getRandomItem(itemsList), price: 520, description: "GB Ginger", date: (addDays(new Date()))},
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
//     {
//         id: uuidv4(),
//         price: randomIntFromInterval(30, 500),
//         description: getRandomItem(itemsList),
//         name: getRandomItem(itemsList),
//         date: (addDays(new Date()))
//     },
// ];



// export const dumdumData = [
//     {id: "1",name: "ddd", price: 30, description: "chai", date: (addDays(new Date(), 20))},
//     {id: "3",name: "dfkjldlk", price: 170, description: "Shwarma", date: (addDays(new Date()))},
//    {id: uuidv4(), price: randomIntFromInterval(30,500), description: "dfkljd", name: "dlfjkl", date: (addDays(new Date()))},
// ];
