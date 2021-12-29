// @flow 
import * as React from 'react';
import DateSortedView from "../../Home/_components/DateSortedView";
import {Modes} from "../../api/component_config/Modes";
import {Expense} from "../../../Definitions/Expense";

type Props = {
    expenses:Expense[]
    
};
export const NewExpenseView = ({expenses}: Props) => {
    return (
        <DateSortedView mode={Modes.create}
                        styleClasses={" w-100  pt-3  py-2 px-0 shadow-sm bg-white my-3  rounded-[10px] h-auto "}
                        expenses={expenses}/>
    );
};

export default NewExpenseView;