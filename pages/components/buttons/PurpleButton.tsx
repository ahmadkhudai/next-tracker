// @flow
import * as React from 'react';

type Props = {
    text:string;
    onClick:any;
    styleClasses?:string;
};
type State = {};

export function PurpleButton({onClick, text, styleClasses}:Props) {
    let classes = "btn hover:bg-teal-400 text-white bg-purple-500 hover:font-bold ";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text}</button>
    );
};

export default PurpleButton;