import * as React from 'react';

import * as ReactRouter from 'react-router-dom';
const { BrowserRouter, Route, Switch, Redirect } = ReactRouter;

import Content from './Components/Content';
import { Link } from './Components/Sidebar';
import Sidebar from './Components/Sidebar';

const links: Link[] = [
  {
    link: '/anime',
    name: 'Anime'
  },
  {
    link: '/manga',
    name: 'Manga'
  },
  {
    link: '/drama',
    name: 'Drama'
  },
];

class AppRouter extends React.Component {
  public render () {
    return (
      <BrowserRouter>
        <div style={{ display: "flex" }} className="background">
          <Sidebar links={links} />

          <Switch>
            <Route path="/:type(anime|manga|drama)" component={Content} />
            <Redirect from="/" to="/anime" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
