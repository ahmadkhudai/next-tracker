// @flow
import * as React from 'react';

type Props = {
  customMessage?:string;
};
type State = {};

export class NoData extends React.Component<Props, State> {
    render() {
        const message = this.props.customMessage?this.props.customMessage:" Nothing to display. Please add expenses.";
        return (
            <div className={"ak_card"}>
                <h3>
                    {message}
                </h3>
            </div>
        );
    };
}

export default NoData;