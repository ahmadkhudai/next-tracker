import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import React from "react";
import App from "next/app";
import StateManagedApp from "./StateManagedApp";

class MyApp extends App {
    render() {
        let {Component, pageProps} = this.props;

        return (
            <StateManagedApp />
        )
    }
}

export default MyApp
