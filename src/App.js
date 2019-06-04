import React, { Component } from 'react';
import './App.css';

import Configuration from './components/botConfig/Configuration';


class App extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    }
    
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  renderMenu() {
    return (
      <section className="menu">
        <div>configure</div>
        <div>bot dashboard</div>
        <div>plant info</div>
        <div>profile</div>
      </section>
    )
  }

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    return (
      <div className="App">
        <nav>
          <div className="logo-container">
            <div id="logo"></div>
            <p id="robotanist">roBotanist</p>
          </div>
          <div className="hamburger" onClick={this.toggleMenu}>hamburger</div>
        </nav>
        { this.state.menuOpen ? this.renderMenu() : ''}
        <Configuration/>
      </div>
    );
  }
}

export default App;
