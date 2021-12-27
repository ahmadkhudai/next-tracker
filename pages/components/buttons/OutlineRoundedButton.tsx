// @flow
import * as React from 'react';

type Props = {
    text?:string;
    children?:any;
    onClick:any;
    styleClasses?:string;
};
type State = {};

export function OutlineRoundedButton({onClick, text, children,styleClasses=""}:Props) {
    let classes = "btn  rounded-full  bg-gray-100 hover:font-bold  ";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text?text:children}</button>
    );
};

export default OutlineRoundedButton;