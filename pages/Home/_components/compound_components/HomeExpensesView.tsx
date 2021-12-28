// @flow
import * as React from 'react';
import DateSortedView from "../DateSortedView";
import {Expense} from "../../../../Definitions/Expense";
import {SettingsObj} from "../../../../Definitions/SettingsObj";


type Props = {
    currentExpenses:Expense[];
    settings:SettingsObj;
    deleteExpense:any;
};
type State = {};

export class HomeExpensesView extends React.Component<Props, State> {
    render() {
        const {currentExpenses, settings, deleteExpense} = this.props;
        return (

            <div className={" w-100 "}>

                <div className={"contain_overscroll p-1 "}>
                    <div
                        className={" py-3 my-3  shadow-inner  rounded flex flex-column justify-content-center align-items-center"}
                        style={{

                        }}>
                        <DateSortedView
                            styleClasses={"h-[450px] scrollable overflow-x-scroll"}
                            expenses={currentExpenses}
                            settings={settings} deleteExpense={deleteExpense}/>

                    </div>


                </div>


            </div>
        );
    };
};

export default HomeExpensesView;