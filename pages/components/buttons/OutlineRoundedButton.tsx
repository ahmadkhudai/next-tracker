// @flow
import * as React from 'react';

type Props = {
    text?:string;
    children?:any;
    onClick:any;
    onHover?:any;
    styleClasses?:string;
};
type State = {};

export function OutlineRoundedButton({onClick, text, children,styleClasses="", onHover}:Props) {
    let classes = "btn  rounded-full   hover:font-bold  ";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button onMouseEnter={onHover?onHover:()=>{}} className={classes.toString()} onClick={onClick}>{text?text:children}</button>
    );
};

export default OutlineRoundedButton;