// @flow
import * as React from 'react';
import HomePage from "./HomePage";
import {Expense} from "../../Definitions/Expense";
import {SettingsObj} from "../../Definitions/SettingsObj";


type Props = {
   switchWindow:any;
};
export function Home({switchWindow}:Props) {
    return (
        <HomePage switchWindow={switchWindow}/>
    );
}

export default Home;