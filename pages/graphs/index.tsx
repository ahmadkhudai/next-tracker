// @flow
import * as React from 'react';
import GraphWindow from "./GraphWindow";
import exp from "constants";
import {Expense} from "../../Definitions/Expense";

type Props = {
    expenses:Expense[];
};
type State = {};

class index extends React.Component<Props, State> {
    render() {
        return (
           <GraphWindow expenses={this.props.expenses}/>
        );
    };
}

export default index;