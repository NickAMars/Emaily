import React, { Component } from 'react';

import { BrowserRouter as Router , Route, Switch } from  'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './Header';
import Landing from './Landing';
//const Header = () => <h1> Navigation </h1>;
const Page_Default = () => <h1 style= {{ textAlign: 'center'}}> THE PROCESS </h1>;
const Page_Default1 = () => <h1 style= {{ textAlign: 'center'}}> TRUST </h1>;
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
              <Route        path = "/surveys/new" component= {Page_Default1} />
              <Route        path = "/surveys" component= {Page_Default} />
              <Route exact  path = "/" component= {Landing} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { fetchUser } ) (App);
