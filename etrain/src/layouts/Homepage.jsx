import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import routes from '../routes';

class HomepageLayout extends Component {
  render() {
    return (
      <>
        <TopBar />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/homepage" />
        </Switch>
        <Footer />
      </>
    );
  }
}

function getRoutes(routes) {
  return routes.map((value, key) => {
    if ('' === value.layout)
      return (<Route key={key} path={value.layout + value.path} component={value.component} />);
    else
      return null;
  });
}

export default HomepageLayout;