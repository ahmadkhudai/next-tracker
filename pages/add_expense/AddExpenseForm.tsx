// @flow
import * as React from 'react';
import {useRef, useState} from 'react';
import moment from "moment";
import {Day, getSubtractableDays} from "../../constants/day";
import DateSortedView from "../Home/_components/DateSortedView";
import {Modes} from "../api/component_config/Modes";
import PurpleButton from "../components/buttons/PurpleButton";
import TealButton from "../components/buttons/TealButton";
import LabelPurple from "../components/labels/LabelPurple";
import {startsWithSpace} from "../api/utils/string_utils";
import RedButton from "../components/buttons/RedButton";
import OutlineRoundedButton from "../components/buttons/OutlineRoundedButton";
import NewExpenseContainer from "../components/modals/currentExpense/NewExpenseContainer";
import {addDaysPreserveTime, concat} from "../api/utils/date_utils";

//
// let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

type Props = {
    addNewExpense: any;
    handleClose: any;
};
type State = {};

export function AddExpenseForm({addNewExpense, handleClose}: Props) {


    const [currentlySelectedDate, setCurrentlySelectedDate] = useState(new Date());
    const [expenseName, setExpenseName] = useState("chai");
    const defaultExpense = {
        name: expenseName,
        price: 30,
        description: expenseName + " from Khana Pena. Very Good👍",
        date: currentlySelectedDate
    };
    const [newExpense, setNewExpense] = useState(defaultExpense);

    function handleFieldChange(fieldName: string, fieldValue: any) {

        // if(fieldValue)
        let tempObj: any = {...newExpense};

        if (fieldName === "name") {

            //we are looking if the descriptoin has PERVIOUS expense name
            //first check if the description actually contains the name before cliping
            let description = newExpense.description;
            // console.log(description.slice(expenseName.length, description.length - 1));
            if (descriptionModified || description.startsWith(expenseName)) {
                description = description.slice(expenseName.length)
            }
            if (!startsWithSpace(description)) {
                description = " " + description;
            }
            tempObj.description = fieldValue + description;
            // console.log(newExpense.description.includes(expenseName));

            setExpenseName(fieldValue);
        }

        tempObj[fieldName] = fieldValue;
        if (fieldName === "date") {
            setCurrentlySelectedDate(fieldValue);
        }
        setNewExpense(tempObj);
    }


    enum dateSelectors {
        "none" = "none",
        "thisWeek" = "thisWeek",
        "custom" = "custom"
    }

    const [dateSelector, setDateSelector] = useState(dateSelectors.none);

    // const [weekSelector, setWeekSelector] = useState(false);

    function openSelector(selector: dateSelectors) {
        if (dateSelector === selector) {
            setDateSelector(dateSelectors.none);
        } else {
            setDateSelector(selector);
        }

    }




    const [lastCreatedExpense, setLastExpense] = useState({} as any);


    const [expenseAdded, setExpenseAdded] = useState(false);
    const [descriptionModified, setDescriptionModified] = useState(false);
    const [showCurrentExpense, setShowCurrentExpense] = useState(false);

    function dontShowCurrentExpense() {
        setShowCurrentExpense(false);
    }

    function handleAddExpense() {
        //todo allow user to chose if they want to edit the expense before adding it
        setLastExpense({...newExpense});
        addNewExpense(newExpense);
        setExpenseAdded(true);
        setNewExpense(defaultExpense);

        // document.getElementById("add_expense_form")?.focus();
    }

    function resetState() {
        setExpenseAdded(false);
        setLastExpense(newExpense);
        setShowCurrentExpense(false);
        // scrollToTop();
    }

    const myRef = useRef(null)

    //@ts-ignore
    const executeScroll = () => myRef.current.scrollIntoView()



    return (

        <div className={"  ak_max_600px wrapper wrapper_inner scrollable w-100"}>


            <div className={"fixed_header w-100"}>
                <div className="w-100 flex h-100 ak_max_600px justify-content-between align-items-center shadow-sm rounded-full bg-white/95 p-2 mt-1 px-3 w-100">
                    <p className={" text-xl text-teal-700 hover:text-purple-700 w-75"}>Add Expense</p>


                    <RedButton styleClasses={"    text-sm  rounded-[50%] h-50 mr-2    "} text={"X"}
                               onClick={() => {
                                   handleClose()
                               }}/>


                    {/*</div>*/}

                </div>

            </div>
            {expenseAdded &&
                <NewExpenseContainer handleClose={()=>{}}>
                    <div className={"w-100 ak_max_600px   flex flex-column align-items-center  bg-gradient-to-l from-gray-100   via-teal-50  to-purple-100 h-100 p-4 rounded-[20px] "} style={{"zIndex":"1000"}}>
                        <div className={"w-100 flex flex-column py-4 bg-white p-3 rounded-[10px] shadow-sm"}>
                            <LabelPurple text={"Expense Added!"} styleClasses={" h1 text-4xl"}/>
                            <TealButton styleClasses={" my-2 py-2 text-xl rounded-full"} text={"add more!"} onClick={()=>{executeScroll(); resetState();}}/>
                            <PurpleButton styleClasses={" p-2 my-1 rounded-full "} text={"home"} onClick={() => {
                                handleClose()
                            }}/>
                        </div>
                        <DateSortedView mode={Modes.create}
                                        styleClasses={" w-100  pt-3  py-2 px-0 shadow-sm bg-white my-3  rounded-[10px] h-auto "}
                                        expenses={[{...lastCreatedExpense, id: "1", date: newExpense.date.toString()}]}/>



                        {/*<Expense expense={lastCreatedExpense}/>*/}
                    </div>
                </NewExpenseContainer>

            }

            <div className={"h-[5rem] shadow-inner w-100 py-4"} ref={myRef}></div>
            <div className={"  shadow-sm"}   >
                    <div id={"add_expense_form h-100  "}
                         className={"  flex flex-column bg-white/90 hover:bg-white ak_slow_transition p-3 "}
                         style={{"marginBottom": "4rem"}}

                    >


                        <div id="expense_form" className="pt-3 " onClick={() => {
                            dontShowCurrentExpense()
                        }}>

                            <div className="form-group hover:font-bold ak_slow_transition">
                                <label htmlFor="amountSpent" className="text-xl text-teal-700 hover:text-purple-700">Amount
                                    Spent</label>
                                <div className="">
                                    <input type="number"
                                           className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                           id="amountSpent" placeholder="30" min="0"
                                           value={newExpense.price} onChange={(e) => {
                                        handleFieldChange("price", e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div className="form-group  hover:font-bold ak_slow_transition">
                                <label htmlFor="name" className="text-xl text-teal-700 hover:text-purple-700">Spent on
                                    (clothing, food,
                                    etc...)</label>
                                <div className="">
                                    <input type="text"
                                           className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                           id="name" placeholder="Chai"
                                           value={newExpense.name} onChange={e => {
                                        // setExpenseName(e.target.value);
                                        handleFieldChange("name", e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div className="form-group hover:font-bold ak_slow_transition">
                                <label htmlFor="Description" className="text-xl text-teal-700 hover:text-purple-700">Any Details?</label>

                <textarea
                    className="ak_slow_transition form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                    id="Description" placeholder="Chai"
                    value={newExpense.description} onChange={e => {
                    setDescriptionModified(true);
                    handleFieldChange("description", e.target.value)

                }}/>


                            </div>


                            <div className={"py-3"}>

                                <h2 className={"p-2 text-center h2 text-teal-700 hover:text-purple-700"}>{Day[(moment(newExpense.date).day())] + " " + (moment(newExpense.date).date())}</h2>
                                {dateSelector !== dateSelectors.custom &&
                                    <div>
                                        <div className={"flex justify-content-between pb-3"}>

                                            <div className={" flex flex-column justify-content-between "}>
                                                <button className={"my-1 mx-2  btn bg-teal-400 text-white"}
                                                        onClick={() => {
                                                            handleFieldChange("date", addDaysPreserveTime(new Date(), 0, newExpense.date))
                                                        }}>today
                                                </button>
                                                <button
                                                    className={"my-1 mx-2 btn border-teal-500 hover:bg-teal-400 hover:text-white"}
                                                    onClick={() => {
                                                        handleFieldChange("date", addDaysPreserveTime(new Date(), -1, newExpense.date))
                                                    }}>yesterday
                                                </button>
                                                <button
                                                    className={"my-1 mx-2 btn bg-purple-500 hover:font-bold hover:bg-teal-400 text-white"}
                                                    onClick={() => {
                                                        openSelector(dateSelectors.thisWeek)
                                                    }}>this week
                                                </button>
                                                <button
                                                    className={"my-1 mx-2  btn border-black hover:bg-black hover:text-white"}
                                                    onClick={() => {
                                                        openSelector(dateSelectors.custom)
                                                    }}>specific date
                                                </button>
                                            </div>
                                            <div className={"text-center"}>

                                            </div>

                                            {dateSelector === dateSelectors.thisWeek &&
                                                <div
                                                    className={"flex flex-column overflow-x-scroll align-items-center justify-content-between scrollable px-3 "}>
                                                    {getSubtractableDays(moment(new Date()).weekday()).map
                                                    (
                                                        day => {

                                                            return <button key={day}
                                                                           className={"btn bg-purple-400 hover:font-bold hover:bg-teal-400 text-white my-1 w-100"}
                                                                           onClick={() => {
                                                                               handleFieldChange("date", addDaysPreserveTime(new Date(), -day, newExpense.date));
                                                                           }}>{Day[moment(new Date()).weekday() - day]}</button>

                                                        })
                                                    }

                                                </div>}

                                        </div>
                                    </div>
                                }

                                {dateSelector === dateSelectors.custom &&
                                    <div className={" flex flex-column"}>
                                        <button
                                            className={"btn border-purple-500 hover:bg-purple-500 hover:text-white hover:font-bold"}
                                            onClick={() => {
                                                openSelector(dateSelectors.none)
                                            }}>simple menu
                                        </button>

                                        <div className="form-group hover:font-bold py-2 my-2">

                                            <label htmlFor="Date"
                                                   className="text-teal-700 hover:text-purple-700 h3 hidden">Date</label>
                                            <div className="">
                                                <input type="datetime-local"
                                                       className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                                       id="Date"
                                                       value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                                                       onChange={(e) => {
                                                           if ((e.target.value) !== "") {
                                                               handleFieldChange("date", new Date(e.target.value));
                                                           }
                                                       }}/>
                                            </div>
                                        </div>
                                    </div>


                                }
                                <h2 className={"p-2 text-center h2 text-teal-700 hover:text-purple-700"}>{(moment(newExpense.date).format("hh:mm a"))}</h2>

                                <div className="form-group hover:font-bold mt-2">
                                    <label htmlFor="Time"
                                           className="text-teal-700 hover:text-purple-700 h3 hidden">Time</label>
                                    <div className="">
                                        <input type="time"
                                               className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                               id="Time" value={moment(newExpense.date).format("HH:mm")}
                                               onChange={(e) => {
                                                   if ((e.target.value) !== "") {
                                                       handleFieldChange("date", new Date(concat(newExpense.date, e.target.value)));
                                                   }
                                               }}/>
                                    </div>


                                    </div>


                            </div>




                        </div>
                        <div className={" ak_footer_low_z bg-white/80 w-100 flex justify-content-center    p-2  h-auto shadow-inner "}>
                            <div className="form-group flex justify-content-end  w-100 m-2  ak_max_600px">
                                <TealButton
                                    styleClasses={"ak_max_600mx w-25 p-2     text-white    text-xl  rounded-full"}
                                    text={showCurrentExpense ? "keep editing" : "all done"}
                                    onClick={() => setShowCurrentExpense(!showCurrentExpense)}

                                />
                            </div>
                        </div>

                    </div>

                    {showCurrentExpense &&

                        <NewExpenseContainer handleClose={()=>{dontShowCurrentExpense()}}>
                            <div className="  bg-gradient-to-r from-teal-100/90 via-purple-100 to-purple-200  rounded-[10px]  shadow-sm p-2 form-group position-sticky bottom-0 px-0 pb-0 flex flex-column align-items-end w-100">

                                <div className={"w-100 flex flex-column align-items-center pb-3"}>
                                    <DateSortedView mode={Modes.create}
                                                    styleClasses={" w-100    rounded-2  h-auto "}
                                                    expenseStyleClasses={"  m-0 pb-3 "}
                                                    expenses={[{
                                                        ...newExpense,
                                                        id: "1",
                                                        date: newExpense.date.toString()
                                                    }]}/>
                                    <div className={"flex w-100 align-items-center justify-content-center "}>
                                        <TealButton styleClasses={" d-block w-50 rounded-full  text-white  text-xl m-1 "}
                                                    text={"create!"}
                                                    onClick={() => {
                                                        handleAddExpense();
                                                    }}/>
                                        <PurpleButton styleClasses={" rounded-full py-1 w-auto"} text={"keep editing"} onClick={()=>{dontShowCurrentExpense()}}/>

                                    </div>
                                </div>




                            </div>


                        </NewExpenseContainer>}

                </div>



        </div>
    )
}

export default AddExpenseForm;