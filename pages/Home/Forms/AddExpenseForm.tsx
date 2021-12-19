// @flow
import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addExpense, modifyExpenses} from '../../api/features/expenses/expenseSlice';
import ExpenseComponent from "../Expense.jsx.js";
import {useState} from "react";
import {InputTypes} from "../../../Definitions/InputTypes";
import {SettingLabels} from "../../../Definitions/Setting";
import {Expense} from "../../../Definitions/Expense";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {dumdumData} from "../../api/dummy_data/data";
import { v4 as uuidv4 } from 'uuid';
import {addDays, getDate, getISODate, getRandomItem} from "../../api/utils/date_utils";
// import {addDays, getRandomItem, randomIntFromInterval} form './'

let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

 type Props = {

};
type State = {};

export function AddExpenseForm() {
    const expenses = useSelector((state:any)=> state.expenses.value)
    const settings:SettingsObj = useSelector((state: any) => state.settings.value);
    const dispatch = useDispatch()

    const [newExpense, setNewExpense] = useState( {name: "chai", price: 30, description: "chai", date: new Date()})

    function handleFieldChange(fieldName:string, fieldValue:any){
        console.log("herell");

        let tempObj:any = {...newExpense};
        tempObj[fieldName] =fieldValue;
        tempObj["id"] = ()=>uuidv4();
        console.log(tempObj);
        setNewExpense(tempObj);
    }

    function addNewExpense(){
        console.log("herell");
        console.log(newExpense.date);
        // return;
        let tempObj:any = {...newExpense};
        tempObj["id"] = ()=>uuidv4();

        // console.log(tempObj);
        dispatch(addExpense(tempObj));
    }
    return (
        <div className={"ak_card w-full ak_max_600px"}>
         <h1>Add New expense</h1>
            <div id="expense_form" className="pt-3 " >
                <div className="form-group">
                    <label htmlFor="name" className="">Name</label>
                    <div className="">
                        <input type="text" className="form-control border-0" id="name" placeholder="Chai"
                               value={newExpense.name} onChange={e=> {handleFieldChange("name", e.target.value)}}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Description" className="">Description</label>
                    <div className="">
                        <input type="text" className="form-control border-0" id="Description" placeholder="Chai"
                               value={newExpense.description} onChange={e=> {handleFieldChange("description", e.target.value)}}/>
                    </div>
                </div>
                <div className="form-group ">
                    <label htmlFor="amountSpent" className="">Amount Spent</label>
                    <div className="">
                        <input type="number" className="form-control border-0" id="amountSpent" placeholder="30" min="0"
                               value={newExpense.price} onChange={(e)=>{
                            handleFieldChange("price", e.target.value)}}/>
                    </div>
                </div>
                <div className="form-group ">
                    <label htmlFor="Date" className="">Date</label>
                    <div className="">
                        <input type="datetime-local" className="form-control border-0" id="Date" value={getISODate(newExpense.date)} onChange={(e)=>{
                            handleFieldChange("date",e.target.value)}}/>
                    </div>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="Time" className="">Time</label>*/}
                {/*    <div className="">*/}
                {/*       <input className="form-control border-0" type="time"/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="form-group">
                    <button  className="btn btn-outline-primary w-100 h-100" onClick={()=>{addNewExpense();}} >ADD EXPENSE</button>
                </div>

            </div>

        </div>
    )
}

export default AddExpenseForm;