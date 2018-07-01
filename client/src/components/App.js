import React, { Component } from 'react';

import { BrowserRouter as Router , Route, Switch } from  'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
//const Header = () => <h1> Navigation </h1>;
class App extends Component{
//componentWillMount life cycle method
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router>
          <div className="container">
          <Header />
            <Switch>
              <Route        path = "/surveys/new" component= {SurveyNew} />
              <Route        path = "/surveys" component= {Dashboard} />
              <Route exact  path = "/" component= {Landing} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { fetchUser } ) (App);
