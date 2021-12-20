// @flow
import * as React from 'react';

type Props = {
    message:string;
};
type State = {};

export class SubliminalMessage extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <p className={"ak_highlight font-monospace"}>{this.props.message}</p>
            </div>
        );
    };
}

export default SubliminalMessage;