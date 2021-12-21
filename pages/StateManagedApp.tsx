// @flow
import * as React from 'react';
import {useEffect, useState} from "react";
import Main from "./Main";
import {dumdumData} from "./api/dummy_data/data";
import {baseSettings, sortfunction} from "./api/utils/expense_utils";
import {Expense} from "../Definitions/Expense";
import {SettingsObj} from "../Definitions/SettingsObj";

type Props = {

};
type State = {};

/**
 * State managed app has global state
 * Entry point -> Main
 * @constructor
 */
export function StateManagedApp() {

    return (
            <Main />
    );
}

export default StateManagedApp;