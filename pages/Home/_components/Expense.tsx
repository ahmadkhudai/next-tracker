// @flow
import * as React from 'react';
import {Expense} from "../../../Definitions/Expense";
import {SettingLabels} from "../../../Definitions/Setting";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {baseSettings} from "../../api/utils/expense_utils";
import moment from "moment";

type Props = {
 expense:Expense;
 settings?:SettingsObj;
 deleteExpense?:any;
};
type State = {

};

export class ExpenseComponent extends React.Component<Props, State> {
    render() {
        let expense = this.props.expense;
        let onclickHandler:any = (expense:Expense)=>{
            this.props.deleteExpense(expense);
        };
        if(!this.props.deleteExpense){
            onclickHandler=null;
        }
        let settings:any = this.props.settings || baseSettings;
        return (
            <div className=" bg-white/90 py-1 rounded font-monospace my-2" >
                <ul className=" justify-content-between border-0 m-2 p-1 flex items-center">
                    <li className="list-group-item border-0  ak_black" style={expense.price>settings[SettingLabels.maxAcceptableRange].value?{  color: "#bb0a0a",
                        "fontWeight": "normal"}:{}}>{expense.price}</li>
                    <li className="list-group-item border-0 flex-fill">{expense.name}</li>
                    <li className="list-group-item border-0">{moment(expense.date).format("hh:mm A")}</li>

                    <li className="list-group-item p-1 m-0 border-0">
                        <button className="m-0 btn w-100 h-100  btn-danger hover:font-bold hover:bg-teal-400 hover:border-teal-300" style={
                            onclickHandler?(settings[SettingLabels.deleteMode].value?{}:{"display":"none"}):{"display":"none"}} onClick={()=>onclickHandler(expense)
                        }>X</button>
                    </li>
                </ul>
            </div>
        );
    };
};

export default ExpenseComponent;