// @flow
import * as React from 'react';

type Props = {
    text:string;
    onClick:any;
    styleClasses?:string;
};
type State = {};

export function OutlineRoundedButton({onClick, text, styleClasses=""}:Props) {
    let classes = "btn hover:text-white hover:bg-teal-400 rounded-full  bg-gray-100 hover:font-bold border-purple-500 ";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text}</button>
    );
};

export default OutlineRoundedButton;