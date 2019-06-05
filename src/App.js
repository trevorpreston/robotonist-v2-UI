import React, { Component } from 'react';
import './styles/App.scss';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Configuration from './components/botConfig/Configuration';
import Menu from './components/Menu';
import BotDashboard from './components/BotDashboard';
import PlantManager from './components/PlantManager';
import Profile from './components/Profile';


class App extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
      currentPage: 'configure'
    }
    
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  toggleMenu() {
    this.setState( prevState => ({
      menuOpen: !prevState.menuOpen
    }))
  }

  changePage(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Router>
        <nav>
          <div className="logo-container">
            <img src="./images/logo.png" alt="sprout-logo" className="logo"/>
            <span id="robotanist">roBotanist</span>
          </div>
          <div className="hamburger" onClick={this.toggleMenu}>hamburger</div>
        </nav>
        { this.state.menuOpen && <Menu/> }
        <Route exact path="/" component={Configuration} />
        <Route path="/dashboard/" component={BotDashboard} />
        <Route path="/plantmanager/" component={PlantManager} />
        <Route path="/profile/" component={Profile} />
      </Router>
    );
  }
}

export default App;
