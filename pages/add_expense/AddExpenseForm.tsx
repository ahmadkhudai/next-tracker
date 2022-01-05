// @flow
import * as React from 'react';
import {RefObject, useEffect, useRef, useState} from 'react';
import PurpleButton from "../components/buttons/PurpleButton";
import TealButton from "../components/buttons/TealButton";
import LabelPurple from "../components/labels/LabelPurple";
import RedButton from "../components/buttons/RedButton";
import NewExpenseContainer from "../components/modals/currentExpense/NewExpenseContainer";
import NewExpenseView from "./_components/NewExpenseView";
import LargeFormDisplay, {FormCenteredDisplay} from "./_components/FormCenteredDisplay";
import DateTimeInput from "./_components/DateTimeInput";
import Non_DateInputs from "./_components/Non_DateInputs";
import moment from "moment";
import OutlineRoundedButton from "../components/buttons/OutlineRoundedButton";

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
    const [defaultDate, setDefaultDate] = useState(true);
    const defaultExpense = {
        name: "chai",
        price: 30,
        description: "chai from cafe",
        location: "cafe",
        date: currentlySelectedDate
    };
    const [newExpense, setNewExpense] = useState(defaultExpense);


    useEffect(() => {
        handleFieldChange("description", newExpense.price + " spent on " + newExpense.name + " from " + newExpense.location)
    }, [newExpense.name, newExpense.price, newExpense.location]);


    function handleFieldChange(fieldName: string, fieldValue: any) {

        // if(fieldValue)
        let tempObj: any = {...newExpense};

        tempObj[fieldName] = fieldValue;
        if (fieldName === "date") {
            setCurrentlySelectedDate(fieldValue);
        }
        setNewExpense(tempObj);
    }




    const [lastCreatedExpense, setLastExpense] = useState({} as any);


    const [expenseAdded, setExpenseAdded] = useState(false);
    const [showCurrentExpense, setShowCurrentExpense] = useState(false);

    function dontShowCurrentExpense() {
        setShowCurrentExpense(false);
    }

    function handleAddExpense() {
        //validate


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

    const doneButtonRef:RefObject<any> = useRef();
    const myRef:RefObject<any> = useRef()

    //@ts-ignore
    // const executeScroll = () => myRef.current.scrollIntoView()
    const executeScroll = (ref: RefObject<any>) => {
        ref.current.scrollIntoView({behavior: 'smooth'});
        setTimeout(()=> ref.current.focus(),300);
    }

    function toggleShowCurrentExpense() {
        setShowCurrentExpense(!showCurrentExpense);
    }

    // function doneDunadun(){
    //     doneButtonRef.current.focus;
    // }


    return (

        <div className={"  ak_max_600px wrapper wrapper_inner scrollable w-100"}>


            <div className={"fixed_header w-100"}>
                <div
                    className="w-100 flex h-100 ak_max_600px justify-content-between align-items-center shadow-sm   bg-white/95 p-2 px-3 w-100 rounded-[10px] rounded-tl-0">
                    <p className={" text-xl text-teal-700 hover:text-purple-700 w-75"}>Add Expense</p>




                </div>

            </div>
            {expenseAdded &&
                <NewExpenseContainer handleClose={() => {
                }}>
                    <div
                        className={"w-100 ak_max_600px   flex flex-column align-items-center  bg-gradient-to-l from-gray-100   via-teal-50  to-purple-100 h-100 p-4 rounded-[20px] "}
                        style={{"zIndex": "1000"}}>
                        <div className={"w-100 flex flex-column py-4 bg-white p-3 rounded-[10px] shadow-sm"}>
                            <LabelPurple text={"Expense Added!"} styleClasses={" h1 text-4xl"}/>
                            <PurpleButton styleClasses={" p-2 my-1 rounded-full"} text={"add more!"} onClick={() => {
                                executeScroll(myRef);
                                resetState();
                            }}/>


                        </div>
                        <NewExpenseView
                            expenses={[{...lastCreatedExpense, id: "1", date: newExpense.date.toString()}]}/>

                        <TealButton styleClasses={"  my-2 py-2 text-3xl rounded-full w-75"} text={"home"}
                                    onClick={() => {
                                        handleClose()
                                    }}/>

                        {/*<Expense expense={lastCreatedExpense}/>*/}
                    </div>
                </NewExpenseContainer>

            }

            <div className={"h-[5rem]  w-100 py-4"} ref={myRef}></div>
            <div className={"  shadow-sm"}>
                <div id={"add_expense_form h-100  "}
                     className={"  flex flex-column bg-white/90 hover:bg-white ak_slow_transition p-3 "}
                     style={{"marginBottom": "4rem"}}

                >


                    <div id="expense_form" className="pt-3 ">

                       <div className={"py-3"}>
                           <Non_DateInputs doneButtonRef={doneButtonRef} newExpense={{...newExpense, id: "1", date: newExpense.date.toString()}} handleFieldChange={handleFieldChange}/>
                       </div>



                        <div className={"py-3"}>
                            {defaultDate &&
                                <>
                                    <FormCenteredDisplay content={"today - "+moment(newExpense.date).format("hh:mm a")}/>
                                     </>
                            }
                            {!defaultDate &&
                                <DateTimeInput newExpense={{...newExpense, id: "1", date: newExpense.date.toString()}}
                                               handleFieldChange={handleFieldChange}/>
                            }

                            <div className={"flex justify-content-center py-3 w-100"}>
                                <OutlineRoundedButton styleClasses={"border-l-purple-500 hover:border-purple-500 text-purple-500 hover:text-purple-700 hover:text-xl border-b  border-3 ak_slow_transition"} onClick={()=> {
                                    if(defaultDate){
                                        setDefaultDate(false);
                                    }else{
                                        //if it's not default date, clicking this button should reset the date
                                        handleFieldChange("date", (new Date()).toString())
                                        setDefaultDate(true);
                                    }

                                }}>{defaultDate?"change date & time":"current date & time"}</OutlineRoundedButton>

                            </div>
                           {/*<OutlineRoundedButton </OutlineRoundedButton>*/}


                            <div className={"w-100 flex justify-content-center py-3"} >
                                <label className={"w-100 flex justify-content-center"} ref={doneButtonRef}>
                                    <TealButton
                                        styleClasses={"ak_max_600mx w-75   text-white text-xl  rounded-full"}
                                        text={"done!"}

                                        onClick={() => handleAddExpense()}

                                    />
                                </label>

                            </div>


                        </div>


                    </div>
                    <div className={" ak_footer_low_z bg-white/80 w-100 flex justify-content-center h-auto shadow-lg "}>
                        <div className="form-group flex justify-content-around  w-75   ak_max_600px py-2  m-0">

                            <RedButton styleClasses={"    text-xl  rounded-pill   p-1 w-auto px-3  "} text={"back"}
                                       onClick={() => {
                                           handleClose()
                                       }}/>
                            <PurpleButton
                                styleClasses={"ak_max_600mx w-50   text-white text-xl  rounded-full"}
                                text={showCurrentExpense ? "keep editing" : "quick add"}
                                onClick={() => toggleShowCurrentExpense()}

                            />
                        </div>
                    </div>

                </div>

                {showCurrentExpense &&

                    <NewExpenseContainer handleClose={() => {
                        dontShowCurrentExpense()
                    }}
                    >
                        <div
                            className="  bg-gradient-to-r from-teal-100/90 via-purple-100 to-purple-200  rounded-[10px]  shadow-sm p-2 form-group position-sticky bottom-0 px-0 pb-0 flex flex-column align-items-end w-100">

                            <div className={"w-100 flex flex-column align-items-center pb-3"}>
                                {/*@ts-ignore*/}
                                <NewExpenseView expenses={[{
                                    ...newExpense,
                                    id: "1",
                                    date: newExpense.date.toString()
                                }]}/>
                                <div className={"flex w-100 align-items-center justify-content-center "}>
                                    <PurpleButton styleClasses={" rounded-full py-1 w-auto"} text={"keep editing"}
                                                  onClick={() => {
                                                      dontShowCurrentExpense()
                                                  }}/>

                                    <TealButton styleClasses={" d-block w-50 rounded-full  text-white  text-xl m-1 "}
                                                text={"create!"}
                                                onClick={() => {
                                                    handleAddExpense();
                                                }}/>

                                </div>
                            </div>
                        </div>
                    </NewExpenseContainer>
                }

            </div>


        </div>
    )
}

export default AddExpenseForm;
