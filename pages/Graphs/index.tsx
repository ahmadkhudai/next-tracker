// @flow
import * as React from 'react';
import GraphWindow from "./GraphWindow";
import exp from "constants";

type Props = {
};
type State = {};

class Index extends React.Component<Props, State> {
    render() {
        return (
           <GraphWindow/>
        );
    };
}

export default Index;