// @flow
import * as React from 'react';
import {Day} from "../../../constants/day";
import moment from "moment";

type Props = {
    text:string;
    styleClasses?:any;
};

export function FormCenteredDisplay({text, styleClasses}: Props) {
    let styles = " h2 text-teal-700 hover:text-purple-700 unselectable ";
    if(!styleClasses){
        styles+=" text-center p-2 "
    }else{
        styles+=styleClasses;
    }
    return (
        <>
            <h2 className={styles }>{text}</h2>
        </>
    );
}

export default FormCenteredDisplay;