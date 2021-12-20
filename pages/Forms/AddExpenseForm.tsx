// @flow
import * as React from 'react';
import {useState} from "react";
import {addDays, getDate, getISODate, getRandomItem, isGreaterThanToday} from "../api/utils/date_utils";


let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

 type Props = {
    addNewExpense:any;
};
type State = {};

export function AddExpenseForm({addNewExpense}:Props) {


    const [newExpense, setNewExpense] = useState( {name: "chai", price: 30, description: "chai", date: new Date()})

    function handleFieldChange(fieldName:string, fieldValue:any){
        let tempObj:any = {...newExpense};
        tempObj[fieldName] =fieldValue;
        setNewExpense(tempObj);
    }






    return (

        <div className={"ak_card w-full ak_max_600px my-3"}>

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


                <div className="form-group">
                    <button  className="btn btn-outline-primary w-100 h-100" onClick={()=>{addNewExpense(newExpense);}} >ADD EXPENSE</button>
                </div>

            </div>

        </div>
    )
}

export default AddExpenseForm;