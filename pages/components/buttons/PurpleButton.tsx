// @flow
import * as React from 'react';

type Props = {
    text?:string;
    onClick:any;
    children?:any;
    styleClasses?:string;
    id?:string;
};
type State = {};

export function PurpleButton({onClick, text, styleClasses="", children}:Props) {
    let classes = "btn hover:bg-teal-400 text-white bg-gradient-to-l from-indigo-500   via-indigo-400  to-purple-400  hover:font-bold hover:shadow-lg ";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text?text:children}</button>
    );
};

export default PurpleButton;
