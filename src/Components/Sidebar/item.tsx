import * as React from 'react';

import './index.css';

import { Link as Props } from './index';

import * as ReactRouter from 'react-router-dom';
const { NavLink } = ReactRouter;

class Item extends React.Component<Props, {}> {
  public render () {
    return (
      <NavLink to={this.props.link} className="item">
        {this.props.name}
      </NavLink>
    );
  }
};

export default Item;
