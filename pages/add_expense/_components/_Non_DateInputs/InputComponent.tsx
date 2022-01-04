// @flow
import * as React from 'react';
import LargeFormDisplay from "../FormCenteredDisplay";
import {Expense} from "../../../../Definitions/Expense";
import {RefObject} from "react";

type Props = {
    handleFieldChange:any;
    newExpense:Expense;
    nextInputRef:RefObject<any>;
    fieldLabel:string;
    fieldType:string;
    title:string;
    subtitle:string;
    moveToNextInput:any;
    selfRef:any;
};


export function InputComponent({selfRef, moveToNextInput,title, subtitle, handleFieldChange, newExpense, nextInputRef, fieldLabel, fieldType}: Props) {
    return (
        <>
            <label htmlFor={fieldLabel} className={"w-100"} ref={nextInputRef}>
                <LargeFormDisplay content={title} styleClasses={"p-2   font-thin  unselectable"}/>
                <p className={"text-sm text-center text-gray-400"}>{subtitle}</p>
            </label>

            <input
                   ref={selfRef}
                    type={fieldType}
                   className="form-control border-0 text-center   focus:bg-purple-500 focus:text-white focus:font-bold hover:text-[1.3rem]"
                   id={fieldLabel} placeholder={fieldLabel}
                    onKeyUp={(e)=> {
                        moveToNextInput(e, nextInputRef);
                    }}
                   /* @ts-ignore*/
                   value={newExpense[fieldLabel]} onChange={e => {
                handleFieldChange(fieldLabel, e.target.value)
            }} />
        </>
    );
}
export default InputComponent;
