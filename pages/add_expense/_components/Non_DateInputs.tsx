// @flow
import * as React from 'react';
import {RefObject, useRef} from 'react';
import LargeFormDisplay from "./FormCenteredDisplay";
import {Expense} from "../../../Definitions/Expense";
import InputComponent from "./_Non_DateInputs/InputComponent";

type Props = {
    newExpense: Expense;
    handleFieldChange: any;
    doneButtonRef:any;
    firstInput:RefObject<any>;
};


export function Non_DateInputs({newExpense, handleFieldChange,firstInput, doneButtonRef}: Props) {
    const ref = useRef("test");
    const myRef = useRef(null)

    function handleEnterPress(e: any, nextInput: RefObject<any>) {
        // console.log("HERE TT");
        // console.log(e, e.key);
        // console.log(nextInput);
        if (e.key.toLowerCase() === "enter") {
            executeScroll(nextInput);
        }

    }

    const locationInput: RefObject<any> = useRef();
    const nameInput: RefObject<any> = useRef();
    const amountInput: RefObject<any> = useRef();
// .scrollIntoView({ behavior: 'smooth' });
//
    const executeScroll = (ref: RefObject<any>) => {
        ref.current.scrollIntoView({behavior: 'smooth'});
        setTimeout(()=> ref.current.focus(),300);
    }
    // const executeScroll = (ref: RefObject<any>) =>
    return (
        <>
            {newExpense &&
                <div>
                    {/*<label ref={firstInput} htmlFor="amountSpent" className=" hidden w-100 text-xl text-teal-700 hover:text-purple-700">*/}
                    {/*    <LargeFormDisplay content={"amount spent"}*/}
                    {/*                      styleClasses={"p-2 font-thin unselectable"}/>*/}


                    {/*</label>*/}
                    <div className="form-group hover:font-bold ak_slow_transition">
                        {/*<InputComponent selfRef={amountInput} moveToNextInput={handleEnterPress} handleFieldChange={handleFieldChange}*/}
                        {/*                newExpense={newExpense} nextInputRef={nameInput} fieldLabel={"price"}*/}
                        {/*                fieldType={"number"} title={newExpense.price.toString() + " spent"}*/}
                        {/*                subtitle={"amount spent"}/>*/}
                        <label ref={firstInput}  htmlFor="amountSpent" className="w-100 text-xl text-teal-700 hover:text-purple-700">
                            <LargeFormDisplay content={"amount spent"}
                                              styleClasses={"p-2 font-thin unselectable"}/>


                        </label>
                        <div className="flex">
                            <input type="number"
                                   min={0}
                                   autoFocus={true}
                                   className="text-center mb-0  form-control border-0 hover:bg-purple-500 hover:text-white focus:bg-purple-500 focus:text-white hover:font-bold hover:text-[1.3rem]"
                                   id="amountSpent" placeholder="30"
                                   onKeyUp={(e)=>handleEnterPress(e, nameInput)}
                                   value={newExpense.price} onChange={(e) => {
                                handleFieldChange("price", e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="form-group  hover:font-bold ak_slow_transition">
                        <label htmlFor={"name"} className={"w-100"} ref={nameInput}>
                            <LargeFormDisplay content={"on"} styleClasses={"p-2 font-thin  unselectable"}/>
                            <p className={"text-sm text-center text-gray-400"}>name of expense (chai, zinger, ferrari,
                                cocomo etc)</p>
                        </label>

                        <div className="">
                            <input type="text"
                                   className="form-control border-0 mb-0 text-center  focus:bg-purple-500 focus:text-white hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                   id="name" placeholder="Chai"
                                   onKeyUp={(e) => handleEnterPress(e, locationInput)}
                                   value={newExpense.name} onChange={e => {
                                // setExpenseName(e.target.value);
                                handleFieldChange("name", e.target.value)
                            }}/>
                            <label htmlFor={"location"} className={"w-100"} ref={locationInput}>
                                <LargeFormDisplay content={"from"} styleClasses={"p-2   font-thin  unselectable"}/>
                                <p className={"text-sm text-center text-gray-400"}>location of expense (uni cafe, office
                                    cafe, local mart etc...)</p>
                            </label>

                            <input type="text"

                                   className="form-control border-0 text-center   focus:bg-purple-500 focus:text-white focus:font-bold hover:text-[1.3rem]"
                                   id="location" placeholder="location"
                                   onKeyUp={(e) => handleEnterPress(e, doneButtonRef)}

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
