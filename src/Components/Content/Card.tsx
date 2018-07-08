import * as React from 'react';

import './index.css';

import { Data as Props } from './index';

class Card extends React.PureComponent<Props, {}> {
    public render () {
        const { score, image, title, status } = this.props;
        return (
            <div className="card">
                <div className="image">
                    <span className="circle">
                        <p>{score}</p>
                    </span>
                    <img src={image} alt="" />
                </div>
                <p className="title">{
                    title.length > 25
                    ? `${title.substring(0, 22)}...`
                    : title
                }</p>
                <p className="subtitle">{status}</p>
            </div>
        );
    }
}

export default Card;