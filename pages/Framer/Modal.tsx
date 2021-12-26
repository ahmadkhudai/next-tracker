// @flow
// import { motion } from 'framer-motion';
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
           <div
               // variants={dropIn}
               // initial={"hidden"}
               // animate={"visible"}
               // exit={"exit"}
               id={"modal"}

               className={" text-center bg-red-800/90 grid justify-center"}
           >

               <div className={"my-3"}>
                   <h2 className={"text-xl font-normal leading-normal  text-white"}>{message}</h2>
                   <h3 className={"text-white text-center h-auto"}>{subtitle}</h3>
               </div>
               <div className={""}>
                   <button className={"text-white"} onClick={(e:any)=> handleClose(e)}>
                       Close
                   </button>
               </div>



           </div>
           {/*<motion.div*/}
           {/*     variants={dropIn}*/}
           {/*     initial={"hidden"}*/}
           {/*     animate={"visible"}*/}
           {/*     exit={"exit"}*/}
           {/*     id={"modal"}*/}

           {/*     className={" text-center bg-red-800/90 grid justify-center"}*/}
           {/*>*/}

           {/*        <div className={"my-3"}>*/}
           {/*            <h2 className={"text-xl font-normal leading-normal  text-white"}>{message}</h2>*/}
           {/*            <h3 className={"text-white text-center h-auto"}>{subtitle}</h3>*/}
           {/*        </div>*/}
           {/*        <div className={""}>*/}
           {/*            <button className={"text-white"} onClick={(e:any)=> handleClose(e)}>*/}
           {/*                Close*/}
           {/*            </button>*/}
           {/*        </div>*/}



           {/*</motion.div>*/}
       </Backdrop>
    );
};

export default Modal;