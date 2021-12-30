// @flow
import * as React from 'react';
import {addDaysPreserveTime} from "../../../api/utils/date_utils";
import {Day, getSubtractableDays} from "../../../../constants/day";
import moment from "moment";
import {Expense} from "../../../../Definitions/Expense";
import {dateSelectors} from "../DateTimeInput";
import PurpleButton from "../../../components/buttons/PurpleButton";
import LargeFormDisplay from "../FormCenteredDisplay";

type Props = {
    newExpense:Expense;
    handleFieldChange:any;
    openSelector:any;
    dateSelector:any;
};

export function SimpleSelectors({newExpense, handleFieldChange, openSelector, dateSelector}: Props) {

    let i = 0;

    function getI() {
        let ti = i;
        i+=1;
        return ti;
    }

    return (
        <>
            {newExpense &&

                <div className={"flex justify-content-center pb-3 w-100"}>


                    <div className={" flex flex-column justify-content-center w-100"}>
                        {/*<div className={"flex flex-row py-3 align-items-center justify-content-center"}>*/}
                            {/*<LargeFormDisplay content={Day[(moment(newExpense.date).day())].slice(0,3) + " " + (moment(newExpense.date).date())} styleClasses={"font-thin flex text-thin text-sm w-25 justify-content-center h-full align-items-center"}/>*/}
                            <input type="datetime-local"
                                   className="form-control border-solid border-2 border-light-blue-500    text-center my-2 flex align-items-center justify-content-center flex-row-reverse px-0 py-3 "
                                   id="Date"
                                   value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                                   onChange={(e) => {
                                       if ((e.target.value) !== "") {
                                           handleFieldChange("date", new Date(e.target.value));
                                       }
                                   }}/>
                        {/*</div>*/}

                        <div className={"flex justify-content-center"}>


                            <button
                                className={"my-1 mx-2 btn border-teal-500 hover:bg-teal-400 hover:text-white w-50"}
                                onClick={() => {
                                    handleFieldChange("date", addDaysPreserveTime(new Date(), -1, newExpense.date))
                                }}>yesterday
                            </button>
                            <button className={"my-1 mx-2  btn bg-teal-400 text-white w-50"}
                                    onClick={() => {
                                        handleFieldChange("date", addDaysPreserveTime(new Date(), 0, newExpense.date))
                                    }}>today
                            </button>
                        </div>

                        <div className={"flex flex-column"}>
                            <button
                                className={"my-1 mx-2 btn bg-purple-500 hover:font-bold hover:bg-teal-400 text-white"}
                                onClick={() => {
                                    openSelector(dateSelectors.thisWeek)
                                }}>this week
                            </button>
                            {dateSelector === dateSelectors.thisWeek &&
                                <div
                                    className={"flex flex-column contain_overflow  align-items-center justify-content-center  h-[160px]  px-3 w-100 "}>
                                    <div className={"flex flex-column w-100 contain_overflow wrapper  justify-content-center align-items-center  bg-gray-100 overflow-y-scroll shadow-inner  py-1 m-1 "}>
                                        <div className={"h-100 flex flex-column w-100  align-items-center py-4"}>
                                            {getSubtractableDays(moment(new Date()).weekday()).map
                                            (
                                                day => {

                                                    return (   <div className={"w-100 flex flex-row  justify-content-center align-items-center"}>

                                                        {/*<FormCenteredDisplay content= styleClasses={}/>*/}

                                                        <PurpleButton key={day}
                                                                      styleClasses={"btn bg-purple-400 hover:font-bold hover:bg-teal-400 text-white my-1 w-75  "}
                                                                      onClick={() => {
                                                                          handleFieldChange("date", addDaysPreserveTime(new Date(), -day, newExpense.date));
                                                                      }}>{Day[moment(new Date()).weekday() - day]}</PurpleButton>
                                                        <p className={"py-0 my-0 px-3 text-2xl text-thin unselectable text-gray-200  bg-indigo-400 rounded-r rounded-r-[5px]"}>
                                                            {getI()}
                                                        </p>
                                                    </div>)


                                                })
                                            }
                                            <div className={"p-4"}></div>
                                        </div>

                                    </div>


                                </div>}
                        </div>


                </div>
            </div>}
        </>

    );
}

export default SimpleSelectors;
