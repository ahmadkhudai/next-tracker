// @flow
import * as React from 'react';
import Link from "next/link";
import {saveExpenses} from "../../Exellent/main";
import PurpleButton from "../components/buttons/PurpleButton";
import {useEffect, useState} from "react";
import TealButton from "../components/buttons/TealButton";
type Props = {
    // downloadFunction:any;
    // payload:any;
};

export function DownloadPage(props: Props) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        setExpenses(JSON.parse(localStorage.getItem("ak_expenses") as string)||[]);
    }, []);

    return (
        <div className={"ak_max_600px w-100 container flex flex-column items-center h-[100vh] justify-center"}>
            <TealButton styleClasses={"w-100 my-2 p-3 text-2xl rounded-xl"} onClick={()=>saveExpenses(expenses)}>Click to Download!</TealButton>
            <PurpleButton styleClasses={"w-25 my-2 p-2 text-xl rounded-xl"} onClick={()=>{window.close()}}>
                HOME
            </PurpleButton>

        </div>
    );
}

export default DownloadPage;
