// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
// import OutlineRoundedButton from "../../components/buttons/OutlineRoundedButton";
import {
    isValidSliderState,
    repairSwiperState,
    swiperPosition,
    ViewModes,
    ViewModesDir
} from "../../api/component_config/ViewModes";
// import SwipeableViews from "react-swipeable-views";
// import SwipeableViews from 'react-swipeable-views';
// import {virtualize} from 'react-swipeable-views-utils';
// import {mod} from 'react-swipeable-views-core';
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {NumberIndexedStrings} from "../../../constants/day";
import OutlineRoundedButton from "../../components/buttons/OutlineRoundedButton";
import LabelPurple from "../../components/labels/LabelPurple";
// import SwipeableViews from 'Sw'
type Props = {
    updateViewMode: any;
    currentViewMode: ViewModes;
};
type State = {};


export function ViewModeButtons({updateViewMode, currentViewMode}: Props) {
    // store swiper instance
    const [swiper, setSwiper] = useState(null as any);


    const [sliderState, setSliderState] = useState({
        [swiperPosition.left]: ViewModesDir[0] as ViewModes,
        [swiperPosition.center]: currentViewMode as ViewModes,
        [swiperPosition.right]: ViewModesDir[1] as ViewModes
    });

    useEffect(() => {
       //if the slider state is broken,
        if(!isValidSliderState(sliderState)){
            //repair state
            setSliderState(repairSwiperState({center:sliderState[swiperPosition.center]}))
        }
    }, []);



    function fromRightToLeft(swiper:any) {
        return ( swiper.previousIndex - swiper.activeIndex ) < 0;

    }

    const slideTo = (index: any) => swiper?.slideTo(index);
    return (

        <div id={"effing_swiper"} className={"w-100 px-0 mx-0   bg-gray-200 rounded-full ak_slow_transition bg-gradient-to-r from-teal-500   via-indigo-400  to-purple-500 "}>
            {/*<h1></h1>*/}


                <Swiper
                    className={"flex justify-center w-100 px-0 mx-0"}

                    onSlideChangeTransitionEnd={
                        (swiper) => {
                            //first check if slider is going right-> left or opposite
                            if(fromRightToLeft(swiper)){
                                //direction is right->left


                                let tempVar= sliderState[swiperPosition.right];
                                //update local state
                                //right -> center
                                //center -> left
                                //left -> right
                                setSliderState({
                                    [swiperPosition.left]: sliderState[swiperPosition.center]as ViewModes,
                                    [swiperPosition.center]: sliderState[swiperPosition.right] as ViewModes,
                                    [swiperPosition.right]: sliderState[swiperPosition.left] as ViewModes
                                })

                                updateViewMode(tempVar);


                            }else{
                                //left->right
                                let tempVar = sliderState[swiperPosition.left];

                                //update local state
                                //left -> center
                                //center -> right
                                //right-> left
                                setSliderState({
                                    [swiperPosition.left]: sliderState[swiperPosition.right]as ViewModes,
                                    [swiperPosition.center]: sliderState[swiperPosition.left] as ViewModes,
                                    [swiperPosition.right]: sliderState[swiperPosition.center] as ViewModes
                                })

                                updateViewMode(tempVar);
                            }
                        }
                    }

                    slidesPerView={3}
                    slidesPerGroup={3}
                    loop={true}
                    loopFillGroupWithBlank={true}
                        pagination={{
                            "clickable": false
                        }} navigation={false} >
                    <SwiperSlide className={"w-25"}>
                        <OutlineRoundedButton
                        styleClasses={" w-100   text-center  border-teal-400 text-teal-500  "}
                        text={sliderState[0]} onClick={() => {

                    }}/>
                    </SwiperSlide>
                    <SwiperSlide className={"w-50"}>
                        <LabelPurple
                        styleClasses={"user-select-none w-100 font-bold text-xl text-white   p-1 text-center   "}
                        text={sliderState[1]}/>
                    </SwiperSlide>
                    <SwiperSlide className={"w-25"}>
                        <OutlineRoundedButton
                            styleClasses={" w-100   text-center  border-teal-400 text-teal-500  "}
                            text={sliderState[2]} onClick={() => {

                        }}/>
                    </SwiperSlide>

                </Swiper>


        </div>
    );
}

export default ViewModeButtons;