
import React from "react";
import './App.css';
import UserProfile from './Components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './Components/Movie';
import AboutUs from './Components/AboutUs';
import Header from './Components/Header';
import MovieProfile from './Components/MovieProfile'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {


  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>

        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Movie} />
            <Route exact path="/userprofile"  component={isAuthenticated? UserProfile:Movie} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/movieProfile/:id" component={ MovieProfile} />
          </Switch>
         
        </Router>


      </>
    );
  }

}

export default withAuth0(App);
