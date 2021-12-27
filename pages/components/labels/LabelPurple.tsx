// @flow
import * as React from 'react';

type Props = {
    text?:string;
    children?:any;
    headingLevel?:string;
    styleClasses?:string;
};
type State = {};

export function LabelPurple({ text, styleClasses, headingLevel, children}:Props) {
    let classes = " hover:text-teal-400  text-purple-500 ak_slow_transition ";
    if(styleClasses){
        classes+=styleClasses;
    }
    if(headingLevel){
        classes+=" "+headingLevel;
    }

    return (
        <div>
            <h2 className={classes.toString()} >{text?text:children}</h2>
        </div>

    );
};

export default LabelPurple;