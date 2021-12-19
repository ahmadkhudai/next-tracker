// @flow
import * as React from 'react';
import {useSelector} from "react-redux";
import GroupedExpensesGraph from "./components/GroupedExpensesGraph";

type Props = {

};
type State = {};

function AkGraphs() {
    const expenses = useSelector((state:any)=>state.expenses.value);
    const settings = useSelector((state:any)=>state.settings.val);

    return (
        <div className={"container flex w-full h-full items-center justify-center bg-teal-100 ak_max_600px"}>
            <GroupedExpensesGraph expenses={expenses} />
        </div>
    );
}

export default AkGraphs;