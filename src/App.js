import React from "react";
import './App.css';
import Profile from './Components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './Components/Movie';
import Header from './Components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {


  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>

        <Router>
          <Header/>
          <Switch>
            <Route exact path="/" component={Movie} />
          </Switch>
          <Switch>
            <Route exact path="/proflie" component={isAuthenticated&& Profile} />
            <Route exact path="/aboutus" component={ Movie/*AboutUs*/} />

          </Switch>
        </Router>
  

      </>
    );
  }
}

export default withAuth0(App);
