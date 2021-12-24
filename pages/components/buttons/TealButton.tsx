// @flow
import * as React from 'react';

type Props = {
    text:any;
    onClick:any;
    styleClasses?:string;
};
type State = {};

export function TealButton({onClick, text, styleClasses}:Props) {
    let classes = "btn hover:bg-purple-400 text-white bg-teal-400 hover:font-bold";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text}</button>
    );
};

export default TealButton;