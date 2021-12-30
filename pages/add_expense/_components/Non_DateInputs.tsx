// @flow
import * as React from 'react';
import LargeFormDisplay from "./FormCenteredDisplay";
import {Expense} from "../../../Definitions/Expense";

type Props = {
    newExpense:Expense;
    handleFieldChange:any;
};

export function Non_DateInputs({newExpense, handleFieldChange}: Props) {
    return (
        <>
            {newExpense &&
            <div>
                <div className="form-group hover:font-bold ak_slow_transition">
                    <label htmlFor="amountSpent" className="w-100 text-xl text-teal-700 hover:text-purple-700">
                        <LargeFormDisplay content={newExpense.price.toString() + " spent"}
                                          styleClasses={"p-2 font-thin unselectable"}/>

                    </label>
                    <div className="">
                        <input type="number"
                               min={0}
                               className="text-center mb-0  form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                               id="amountSpent" placeholder="30"
                               value={newExpense.price} onChange={(e) => {
                            handleFieldChange("price", e.target.value)
                        }}/>
                    </div>
                </div>
                <div className="form-group  hover:font-bold ak_slow_transition">
                    <label htmlFor={"name"} className={"w-100"}>
                        <LargeFormDisplay content={"on"} styleClasses={"p-2 font-thin  unselectable"}/>
                    </label>

                    <div className="">
                        <input type="text"
                               className="form-control border-0 mb-0 text-center hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                               id="name" placeholder="Chai"
                               value={newExpense.name} onChange={e => {
                            // setExpenseName(e.target.value);
                            handleFieldChange("name", e.target.value)
                        }}/>
                        <label htmlFor={"location"} className={"w-100"}>
                            <LargeFormDisplay content={"from"} styleClasses={"p-2   font-thin  unselectable"}/>
                        </label>

                        <input type="text"
                               className="form-control border-0 text-center   hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                               id="location" placeholder="location"
                               value={newExpense.location} onChange={e => {
                            handleFieldChange("location", e.target.value)
                        }}/>
                    </div>
                </div>
            </div>

            }

        </>
    );
};

export default Non_DateInputs;
