// @flow


// import {motion, AnimatePresence} from "framer-motion";
import * as React from 'react';
// import {useState} from "react";
import {Modal} from "./Modal";

type Props = {
    message:string;
    subtitle:any;
    handleClose:any;
};
type State = {};

export function ModalContainer({message, subtitle, handleClose}:Props) {

    return (

        <div className={"root-div"}>
            {/*<AnimatePresence*/}
            {/*    initial={false}*/}
            {/*    exitBeforeEnter={true}*/}
            {/*    onExitComplete={()=>null}>*/}
                <Modal message={message} subtitle={subtitle} handleClose={handleClose}/>
            {/*</AnimatePresence>*/}
        </div>
    );
}

export default ModalContainer;