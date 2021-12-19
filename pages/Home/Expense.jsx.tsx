// @flow
import * as React from 'react';
import {Expense} from "../../Definitions/Expense";
import {getLocaleTimeString} from "../api/utils/date_utils";
import {Setting, SettingLabels} from "../../Definitions/Setting";
import {SettingsObj} from "../../Definitions/SettingsObj";

type Props = {
 expense:Expense;
 settings:SettingsObj;
};
type State = {

};

export class ExpenseComponent extends React.Component<Props, State> {
    render() {
        let expense = this.props.expense;
        let onclickHandler:any = ()=>{};
        let settings:SettingsObj = this.props.settings;
        return (
            <div className="p-[3px] font-monospace my-2" id="expense">
                <ul className="list-group list-group-horizontal justify-content-between m-2 p-1 flex items-center">
                    <li className="list-group-item ak_black" style={expense.price>settings[SettingLabels.maxAcceptableRange].value?{  color: "#bb0a0a",
                        "fontWeight": "normal"}:{}}>{expense.price}</li>
                    <li className="list-group-item flex-fill">{expense.name}</li>
                    <li className="list-group-item">{getLocaleTimeString(expense.date)}</li>

                    <li className="list-group-item p-1 m-0">
                        <button className="m-0 btn w-100 h-100   btn-danger" style={
                            onclickHandler?(settings[SettingLabels.deleteMode].value?{}:{"display":"none"}):{"display":"none"}} onClick={()=>onclickHandler(expense)
                        }>X</button>
                    </li>
                </ul>
            </div>
        );
    };
};

export default ExpenseComponent;