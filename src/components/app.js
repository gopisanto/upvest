import React, { Component } from 'react';
import { withRouter, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './home';
import Contacts from './contacts';
import Search from './search';
import { loadCustomers } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.loadCustomers();
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <nav>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/contacts">Contacts</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
          </nav>
        </div>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/search" component={Search} />
          <Route path="/help" component={Home} />
        </div>
        <div className="footer">
          <label>Footer</label>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  loadCustomers: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { loadCustomers })(App));
