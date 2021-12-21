// @flow
import * as React from 'react';
import {useState} from "react";
import moment from "moment";

//
// let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

 type Props = {
    addNewExpense:any;
};
type State = {};

export function AddExpenseForm({addNewExpense}:Props) {


    const defaultExpense = {name: "chai", price: 30, description: "Chai from Khana Pena. Very Good👍", date: new Date()};
    const [newExpense, setNewExpense] = useState(defaultExpense);

    function handleFieldChange(fieldName:string, fieldValue:any){

        let tempObj:any = {...newExpense};

        tempObj[fieldName] =fieldValue;
        console.log(fieldValue);
        setNewExpense(tempObj);
    }




    return (

        <div className={" w-full ak_max_600px my-3 bg-white/90 bg-gray-300/30 p-3"}>

         <h4 className={"h4 text-teal-700 hover:text-purple-700 text-center p-2"}>Add New expense</h4>
            <div id="expense_form" className="pt-3 " >
                <div className="form-group  hover:font-bold">
                    <label htmlFor="name" className="text-teal-700 hover:text-purple-700">Name</label>
                    <div className="">
                        <input type="text" className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]" id="name" placeholder="Chai"
                               value={newExpense.name} onChange={e=> {handleFieldChange("name", e.target.value)}}/>
                    </div>
                </div>
                <div className="form-group hover:font-bold">
                    <label htmlFor="Description" className="text-teal-700 hover:text-purple-700">Description</label>
                    <div className="">
                        <input type="text" className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]" id="Description" placeholder="Chai"
                               value={newExpense.description} onChange={e=> {handleFieldChange("description", e.target.value)}}/>
                    </div>
                </div>
                <div className="form-group hover:font-bold">
                    <label htmlFor="amountSpent" className="text-teal-700 hover:text-purple-700">Amount Spent</label>
                    <div className="">
                        <input type="number" className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]" id="amountSpent" placeholder="30" min="0"
                               value={newExpense.price} onChange={(e)=>{
                            handleFieldChange("price", e.target.value)}}/>
                    </div>
                </div>
                <div className="form-group hover:font-bold">
                    <label htmlFor="Date" className="text-teal-700 hover:text-purple-700">Date</label>
                    <div className="">
                        <input type="datetime-local" className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]" id="Date" value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")} onChange={(e)=>{

                            handleFieldChange("date", new Date(e.target.value));}}/>
                    </div>
                </div>


                <div className="form-group">
                    <button  className="btn hover:text-white hover:font-bold hover:bg-teal-400 border-teal-300 w-100 h-100" onClick={()=>{addNewExpense(newExpense); setNewExpense(defaultExpense);}} >ADD EXPENSE</button>
                </div>

            </div>

        </div>
    )
}

export default AddExpenseForm;