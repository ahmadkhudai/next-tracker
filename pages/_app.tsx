import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import React from "react";
import App from "next/app";
import Main from "./Main";

class MyApp extends App {
    render() {
        let {Component, pageProps} = this.props;

        return (
            <Main />
        )
    }
}

export default MyApp
