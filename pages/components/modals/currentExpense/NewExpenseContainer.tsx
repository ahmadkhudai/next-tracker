// @flow


// import {motion, AnimatePresence} from "framer-motion";
import * as React from 'react';
import NewExpenseModal from "./NewExpenseModal";
import {Expense} from "../../../../Definitions/Expense";
import NewExpenseView from "../../../add_expense/_components/NewExpenseView";
import PurpleButton from "../../buttons/PurpleButton";
import TealButton from "../../buttons/TealButton";


type Props = {

    handleClose:any;
    children:any;
};
type State = {};

export function NewExpenseContainer({ handleClose, children}:Props) {

    return (

        <div className={"root-div"}>
                <NewExpenseModal handleClose={handleClose}>

                    {children}
                </NewExpenseModal>
            {/*</AnimatePresence>*/}
        </div>
    );
}

export default NewExpenseContainer;