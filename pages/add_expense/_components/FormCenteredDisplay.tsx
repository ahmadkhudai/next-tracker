// @flow
import * as React from 'react';
import {Day} from "../../../constants/day";
import moment from "moment";

type Props = {
    content:any;
    styleClasses?:any;
};

export function FormCenteredDisplay({content, styleClasses}: Props) {
    let styles = " h2 text-teal-700 hover:text-purple-700 unselectable text-center p-2";
    if(styleClasses){
        styles+=styleClasses;
    }
    return (
        <>
            <p className={styles }>{content}</p>
        </>
    );
}

export default FormCenteredDisplay;