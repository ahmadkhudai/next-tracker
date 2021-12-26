// @flow


// import {motion, AnimatePresence} from "framer-motion";
import * as React from 'react';
import NewExpenseModal from "./NewExpenseModal";
import {Expense} from "../../../../Definitions/Expense";


type Props = {
    handleClose:any;
    children:any;
};
type State = {};

export function NewExpenseContainer({ handleClose, children}:Props) {

    return (

        <div className={"root-div"}>
            {/*<AnimatePresence*/}
            {/*    initial={false}*/}
            {/*    exitBeforeEnter={true}*/}
            {/*    onExitComplete={()=>null}>*/}
                <NewExpenseModal handleClose={handleClose}>{children}</NewExpenseModal>
            {/*</AnimatePresence>*/}
        </div>
    );
}

export default NewExpenseContainer;