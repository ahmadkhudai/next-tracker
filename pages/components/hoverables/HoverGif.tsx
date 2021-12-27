// @flow
import * as React from 'react';
import Image from "next/image";
import {useEffect, useState} from "react";

type Props = {
    stationaryImage:any;
    gifImage:any;
    focused:boolean;
};
type State = {};

export function HoverGif({stationaryImage, gifImage, focused}:Props) {
    const [currentImage, setCurrentImage] = useState(stationaryImage);

    useEffect(() => {
        if(focused){
            setCurrentImage(gifImage);
        }else{
            setCurrentImage(stationaryImage);
        }
    }, [focused]);

    return (
        <div className={"p-0 m-0"} onFocus={()=>{setCurrentImage(gifImage)}} onBlur={()=>{setCurrentImage(stationaryImage)}} onMouseEnter={()=>{setCurrentImage(gifImage)}} onMouseLeave={()=>{setCurrentImage(stationaryImage)}} >
            <Image height={40} width={40} src={currentImage}/>
        </div>
    );
};

export default HoverGif;