// @flow
import * as React from 'react';
import Image from "next/image";
import saveIcon from "../../../assets/save.png";
import PurpleButton from "../../components/buttons/PurpleButton";
import loadIcon from "../../../assets/upload.png";
import {Expense} from "../../../Definitions/Expense";
import {loadFromFile} from "../../../Exellent/main";
import {mergeExpenses} from "../../../libs/utils/expense/merge";
import {validate} from "../../../libs/utils/expense/validatorts";
import {removeSampleData} from "../../../libs/utils/expense/clearing";

type Props = {
    closeAllPanels:any;
    setSuccessMessage:any;
    modifyExpenses:any;
    expenses:Expense[];
    setExpenses:any;
};

export function DownloadForm({closeAllPanels, setExpenses, setSuccessMessage, expenses, modifyExpenses}: Props) {
    return (
        <div
            className={"ak_max_600px ak_card w-100 flex align-items-center justify-content-center"}>
            <div
                className={"w-75 flex  align-items-center justify-content-center mx-0 px-0 flex-column my-3"}>

                <label htmlFor={"download_button"}> <Image height={40} width={40}
                                                           src={saveIcon}/>
                </label>


                <PurpleButton id={"download_button"} onClick={(e: any) => {
                    // window.open(document.URL, '_blank');
                    let script: any = document.createElement('script');
                    // script.src = 'js/myScript.js';

                    const win: any = window.open(
                        document.URL+"/actions/DownloadPage",
                        "_blank");
                    win.onload = () => {

                        const timer = setInterval(() => {
                            if (win.closed) {
                                clearInterval(timer);
                                setSuccessMessage("Downloaded all!");
                            }
                        }, 200);
                    }

                    closeAllPanels(e);

                }}>DOWNLOAD</PurpleButton>
                <div className={"flex flex-column align-items-center p-2"}>
                    <label htmlFor="myfile">

                        <Image height={40} width={40} src={loadIcon}/>

                    </label>
                    <input
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className={"form-control form-control-file"} type="file" id="myfile"
                        name="myfile" onChange={function (e) {
                        if (e.target.files) {
                            let file = e.target.files[0];
                            loadFromFile({
                                file:file,
                                updateExpenses:modifyExpenses,
                                updateStateFunction:setExpenses,
                                expenses:expenses,
                                validate:validate,
                                mergeExpenses,
                                removeSampleData,
                                setSuccessMessage
                            });
                            //@ts-ignore
                            e.target.value = null;

                            closeAllPanels(e);
                        }
                    }}/>
                </div>


            </div>
        </div>
    );
}
export default DownloadForm;
