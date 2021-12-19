// @flow
import { motion } from 'framer-motion';
import * as React from 'react';
import Backdrop from "./Backdrop";

type Props = {
 handleClose:any;
 message:string;
 subtitle:string;
};
type State = {};

const dropIn = {
    hidden:{
        y:"-100vh",
        opacity: 0
    },
    visible:{
        y:"0",
        opacity:1,
        transition:{
            duration:0.1,
            type:"spring",
            damping:25,
            stiffness:500
        }
    },
    exit:{
        y:"100vh",
        opacity:0,
    }
}

export function Modal({handleClose, message, subtitle}:Props) {
    return (
       <Backdrop onClick={handleClose}>
           <motion.div
               drag
                variants={dropIn}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
                id={"modal"}

                className={" text-center backdrop-blur-[3px] bg-gray-300/40 grid justify-center"}
           >

                   <div className={"my-3"}>
                       <h2 className={"text-3xl font-normal leading-normal mt-0 mb-2 text-red-600"}>{message}</h2>
                       <h3 className={"h3 text-center h-auto"}>{subtitle}</h3>
                   </div>
                   <div className={""}>
                       <button className={"btn btn-dark"} onClick={()=> handleClose()}>
                           Close
                       </button>
                   </div>



           </motion.div>
       </Backdrop>
    );
};

export default Modal;