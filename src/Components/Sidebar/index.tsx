import * as React from 'react';

import './index.css';

import Item from './item';

export interface Link {
  link: string;
  name: string;
}

interface Props {
  links: Link[]
}

class Sidebar extends React.Component<Props, {}> {
  public render () {
    return (
      <div id="sidebar-container">
        <div id="sidebar">
          <div className="top">
            {
              this.props.links.map((link, index) => (
                <Item 
                  key={index.toString()}
                  link={link.link}
                  name={link.name}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
