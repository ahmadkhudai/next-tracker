import {addDoc, collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {app, db} from "./firebase";
import {Expense} from "../Definitions/Expense";
import {repairExpenseAmounts} from "../libs/Data/data_repair";
import {SettingsObj} from "../Definitions/SettingsObj";
import moment from "moment";
import exp from "constants";
import {val} from "dom7";

function getMonthId(date:Date|string){
    return moment(new Date()).format("yyyy-MM");
}

export async function storeUser(userID:string){
    const returnedDoc = await setDoc(doc(db, "users", userID), {
        dateJoined: new Date()
    });
    console.log("RETURNED", returnedDoc);

}

export function storeExpensesLocal(expenses:Expense[], userID:string){

}

export async function storeExpensesServer(expenses:Expense[], userID:string){
    if(!userID){return;}

    expenses = repairExpenseAmounts(expenses);

    for (const expense of expenses) {
        await setDoc(doc(db, "users", userID,"all_expenses", getMonthId(expense.date),"expenses", expense.id), {
            ...expense
        });
    }




    getCurrentMonthsExpenses(userID);
    console.log("CHECK");
}

export async function getCurrentMonthsExpenses(userID: string) {

    const expRef = collection(db, "users", userID, "all_expenses", getMonthId(new Date()), "expenses");

    const q = query(expRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    // console.log(q);
}

export async function storeSettings(settings:SettingsObj, userID:string){

    await setDoc(doc(db, "users", userID), {
        "settings":settings
    }, {merge:true});
}
