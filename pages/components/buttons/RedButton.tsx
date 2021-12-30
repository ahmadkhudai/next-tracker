// @flow
import * as React from 'react';

type Props = {
    text:string;
    onClick:any;
    styleClasses?:string;
};
type State = {};

export function RedButton({onClick, text, styleClasses=""}:Props) {
    let classes = "btn hover:bg-teal-400 text-white bg-red-500  bg-gradient-to-l from-red-500   via-red-600  to-red-800 hover:font-bold ";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text}</button>
    );
};

export default RedButton;
