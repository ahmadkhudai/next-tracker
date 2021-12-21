// @flow
// @flow
import { motion } from 'framer-motion';
import * as React from 'react';
import {useEffect, useState} from "react";
import exp from "constants";

type Props = {
    children:any;
    onClick:any;
};
type State = {};

export function Backdrop({children, onClick}:Props) {
    // const [height, setHeight] = useState((window.innerHeight+window.scrollY+100)+"px");



    // useEffect(() => {
    //     setAllStates();
    //     return () => {
    //         setHeight((window.innerHeight+window.scrollY+100)+"px");
    //     };
    // }, []);
    //
    // const setAllStates = () => {
    //     window.onresize = ()=>setHeight((window.innerHeight+window.scrollY)+"px");
    //     window.onscroll = ()=>setHeight((window.innerHeight+window.scrollY)+"px");
    // }
    return (
       <motion.div
           id={"backdrop"}
           className={"bg-gray-200/10"}
           // className={" backdrop-blur-[1px] bg-gray-300/40"}
           onClick={onClick}
           initial={{opacity:0}}
           animate={{opacity:1}}
           exit={{opacity:0}}
           style={{ height: "100%",
               width: "100%"}}
       >
           {children}
       </motion.div>
    );
};

export default Backdrop;