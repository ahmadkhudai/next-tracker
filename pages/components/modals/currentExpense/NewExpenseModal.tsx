// @flow

import * as React from 'react';
import Backdrop from "../../../Framer/Backdrop";

type Props = {
    handleClose:any;
    children:any;
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
            duration:5,
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

export function NewExpenseModal({handleClose, children}:Props) {
    return (
        <Backdrop onClick={handleClose}>
            <div

                // id={"modal"}

                className={" text-center justify-center"}
            >

                {children}
                {/*<div className={"my-3"}>*/}
                {/*    /!*<DateSortedView expenses={[expense]} mode={Modes.create}/>*!/*/}
                {/*    /!*<h2 className={"text-xl font-normal leading-normal  text-white"}></h2>*!/*/}
                {/*    /!*<h3 className={"text-white text-center h-auto"}>{subtitle}</h3>*!/*/}
                {/*</div>*/}
                {/*<div className={""}>*/}
                {/*    <button className={"text-white bg-black"} onClick={(e:any)=> handleClose(e)}>*/}
                {/*        Close*/}
                {/*    </button>*/}
                {/*</div>*/}



            </div>
        </Backdrop>
    );
};

export default NewExpenseModal;