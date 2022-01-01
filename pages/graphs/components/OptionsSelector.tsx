// @flow
import * as React from 'react';

type Props = {
    onChangeHandler:any;
    currentOption:any;
    children:any;
};

export function OptionsSelector({onChangeHandler, currentOption, children}: Props) {
    return (
        <div className="form-group my-1 shadow-sm hover:drop-shadow-lg rounded-xl ">
            <select className="form-control text-center border-none text-sm " value={currentOption} onChange={(e) => {
                onChangeHandler(e.target.value)
            }}>
                {/*<option value={0}>Day-wise spending</option>*/}

                {children}
            </select>
        </div>
    );
}

export default OptionsSelector;
