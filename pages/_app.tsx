import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import store from "./api/Data/store";
import React, {useState} from "react";
import {TPanels} from "./api/component_config/Main/TPanels";
import HomeHeader from "./components/HomeHeader";
import AK_SettingsPanel from "./Forms/AK_SettingsPanel";
import AddExpenseForm from "./Forms/AddExpenseForm";
import {MainWindows} from "./api/component_config/MainWindows";
import Graphs from "./graphs";
import Home from "./Home/home";
import Main from "./Main";
import App from "next/app";

class MyApp extends App {
    render() {
        let {Component, pageProps} = this.props;

        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}

export default MyApp
