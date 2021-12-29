// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';

import {ViewModes, ViewModesDir} from "../../api/component_config/ViewModes";
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import OutlineRoundedButton from "../../components/buttons/OutlineRoundedButton";
import LabelPurple from "../../components/labels/LabelPurple";
// import SwipeableViews from 'Sw'
type Props = {
    updateViewMode: any;
    currentViewMode: ViewModes;
};
type State = {};


enum swiperPosition {
    "left",
    "center",
    "right",

}

export function ViewModeButtons({updateViewMode, currentViewMode}: Props) {


    const [sliderState, setSliderState] = useState({
        [swiperPosition.left]: ViewModesDir[0] as ViewModes,
        [swiperPosition.center]: currentViewMode as ViewModes,
        [swiperPosition.right]: ViewModesDir[1] as ViewModes
    });

    useEffect(() => {
        //if the slider state is broken,
        if (!isValidSliderState(sliderState)) {
            //repair state
            setSliderState(repairSwiperState({center: sliderState[swiperPosition.center]}))
        }
    }, []);
    useEffect(() => {
            //fixme unexpected change in view mode handled but not corrected!
            // we only get center so we produce slider state from it
        if(!isValidSliderState(sliderState) || sliderState[swiperPosition.center] !== currentViewMode){
            setSliderState(repairSwiperState({center: currentViewMode}))
        }

    }, [currentViewMode]);


    function fromRightToLeft(swiper: any) {
        return (swiper.previousIndex - swiper.activeIndex) < 0;

    }

    const [swiper, setSwiper] = useState(null as any);
    const slideTo = (index: any) => swiper?.slideTo(index);

    function isLeftSliderButton(buttonText:string):boolean{
        return buttonText==sliderState[swiperPosition.left];
    }

    function isValidSliderState(sliderState: any) {



        if (sliderState[swiperPosition.left] === sliderState[swiperPosition.center]) {
            return false;
        }

        if (sliderState[swiperPosition.right] === sliderState[swiperPosition.center]) {
            return false;
        }

        if (sliderState[swiperPosition.left] === sliderState[swiperPosition.right]) {
            return false;
        }
        return true;
    }


    /**
     * Will repair broken slider state for the swiper slider
     * This function only needs center view mode (the current one)
     * because we cannot change the current, so we fix the left and
     * right.
     * @param center
     */
    function repairSwiperState({center}: { center: ViewModes }) {
        let left: ViewModes = ViewModes.week !== center ? ViewModes.week : ViewModes.today;
        return {
            [swiperPosition.left]: left,
            [swiperPosition.center]: center,
            //if left is today, that means center is week. the only other option is month
            //also if left is not today, then it MUST be week. so we have today and month.
            //we have to compare these two with center
            [swiperPosition.right]: left === ViewModes.today ? ViewModes.month : (center === ViewModes.month ? ViewModes.today : ViewModes.month)
        }
    }



    function swipeRightToLeft(){
        let tempVar = sliderState[swiperPosition.right];
        //update local state
        //right -> center
        //center -> left
        //left -> right
        setSliderState({
            [swiperPosition.left]: sliderState[swiperPosition.center] as ViewModes,
            [swiperPosition.center]: sliderState[swiperPosition.right] as ViewModes,
            [swiperPosition.right]: sliderState[swiperPosition.left] as ViewModes
        })

        updateViewMode(tempVar);
    }

    function swipeLeftToRight() {
        //left->right direction
        let tempVar = sliderState[swiperPosition.left];

        //update local state
        //left -> center
        //center -> right
        //right-> left
        setSliderState({
            [swiperPosition.left]: sliderState[swiperPosition.right] as ViewModes,
            [swiperPosition.center]: sliderState[swiperPosition.left] as ViewModes,
            [swiperPosition.right]: sliderState[swiperPosition.center] as ViewModes
        })

        updateViewMode(tempVar);
    }

    return (

        <div id={"effing_swiper"}
             className={"w-100 px-0 mx-0   bg-gray-200 rounded-full ak_slow_transition bg-gradient-to-r from-teal-500   via-indigo-400  to-purple-500 "}>
            {/*<h1></h1>*/}


            <Swiper
                className={"flex justify-center w-100 px-0 mx-0"}

                onSlideChangeTransitionEnd={
                    (swiper) => {
                        //first check if slider is going right-> left or opposite
                        if (fromRightToLeft(swiper)) {
                            //direction is right->left
                            swipeRightToLeft();


                        } else {
                            swipeLeftToRight();
                        }
                    }
                }

                slidesPerView={3}
                slidesPerGroup={3}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    "clickable": false
                }} navigation={false}>
                <SwiperSlide className={"w-25"} onClick={()=>{
                      swipeLeftToRight();
                }}>
                    <OutlineRoundedButton
                        styleClasses={" bg-gray-50 w-100 hover:text-teal-400   text-center  border-teal-400 text-teal-500  "}
                        text={sliderState[0]} onClick={() => {

                    }}/>
                </SwiperSlide>
                <SwiperSlide className={"w-50"}>
                    <LabelPurple
                        styleClasses={"user-select-none w-100 font-bold text-xl text-white   p-1 text-center   "}
                        text={sliderState[1]}/>
                </SwiperSlide>
                <SwiperSlide className={"w-25"} onClick={()=>swipeRightToLeft()}>
                    <OutlineRoundedButton
                        styleClasses={"bg-gray-50 w-100 hover:text-teal-400  text-center  border-teal-400 text-teal-500  "}
                        text={sliderState[2]} onClick={() => {

                    }}/>
                </SwiperSlide>

            </Swiper>


        </div>
    );
}

export default ViewModeButtons;