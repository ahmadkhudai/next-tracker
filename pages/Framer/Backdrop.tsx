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
    const [height, setHeight] = useState("100%");
    useEffect(() => {
        return () => {
            window.onresize = ()=>setHeight(window.innerHeight.toString()+"px");
        };
    }, []);

    return (
       <motion.div
           id={"backdrop"}
           onClick={onClick}
           initial={{opacity:0}}
           animate={{opacity:1}}
           exit={{opacity:0}}
           style={{ height: height,
               width: "100%"}}
       >
           {children}
       </motion.div>
    );
};

export default Backdrop;