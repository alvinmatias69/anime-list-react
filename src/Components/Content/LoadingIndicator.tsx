import * as React from 'react';

import * as Spinner from 'react-spinkit';

export interface Props {
    isLoading: boolean
}

export default class LoadingIndicator extends React.PureComponent<Props, {}> {
    public render () {
        return this.props.isLoading
            ? (
                <Spinner name="three-bounce" color="white" />
              )
            : (
                <div />
              );
    }
}