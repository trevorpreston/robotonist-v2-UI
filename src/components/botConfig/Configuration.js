import React, { Component } from 'react';
import AutoConfigForm from './AutoConfigForm';
import ManualConfigForm from './ManualConfigForm'

class Configuration extends Component {
  constructor() {
    super();
    this.state = {
      manual: false,
      wateringPeriod: 0,
      pastPlants: [],
      bots: [],
      selectedBot: ''
    }
  }

  componentDidMount() {
    // fetchPastPlants();  
    // fetchBots();
    /* NOTE: using dummy data until API is complete. */
    this.setState({  
      pastPlants: [{orchid: 7}, {sunflower: 8}, {bogenzelia: 11}, {snapdragon: 4}, {succulent: 12}],
      bots: [{id: 1, name: 'office', connection: 'url1'}, {id: 2,  name: 'kitchen', connection: 'url2'}, {id: 3, name: 'living room', connection: 'url3'}]
    })
  }

  fetchPastPlants() {
    fetch('localhost:3000/planthistory')
      .then(results => {
        results.json();
      })
      .then(data => {
        this.setState({
          pastPlants: data
        });
      })
  }

  fetchBots() {
    fetch('localhost:3000/botregistry')
    .then(results => {
      results.json();
    })
    .then(data => {
      this.setState({
        bots: data
      });
    })
  }

  updateBot() {
    this.setState({selectedBot: 'booger'})
  }

  toggleFormType() {
    this.setState({manual: !this.state.manual})
  }

  renderBotOptions() {
    return this.state.bots.map(bot => {
      return <option value={bot.name} key={bot.id}>{bot.name}</option>
    })
  }

  renderForm() {
    return (
      <div>
        <select name="bot-select" id="" onChange={this.updateBot}>
          {this.renderBotOptions()}
        </select>
        {this.state.manual ? <ManualConfigForm/> : <AutoConfigForm/>}
        <button onClick={this.updateBot}></button>
      </div>
    )
  }



  render() {
    return (
      <div>
        {this.renderForm()}
        <button className="toggleConfigForm" onClick={this.toggleFormType.bind(this)}>
          {this.state.manual? 'configure with tools' : 'manual configuration'}
        </button>
      </div>
    )
  }
}

export default Configuration;