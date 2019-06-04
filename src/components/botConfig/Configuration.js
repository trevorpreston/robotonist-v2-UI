import React, { Component } from 'react';
import AutoConfigForm from './AutoConfigForm';

class Configuration extends Component {
  constructor() {
    super();
    this.state = {
      manual: false,
      wateringPeriod: 0,
      pastPlants: [],
      bots: [],
      selectedBotId: 1
    }

    this.updateSelectedBot = this.updateSelectedBot.bind(this);
    this.updateWateringPeriod = this.updateWateringPeriod.bind(this);
    this.submitUpdatedPeriod = this.submitUpdatedPeriod.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
  }

  componentDidMount() {
    // fetchPastPlants();  
    // fetchBots();

    /* NOTE: using dummy data until API is complete. */
    this.setState({  
      pastPlants: [
        { id: 1, name: 'orchid', wateringPeriod: 7 }, 
        { id: 1, name: 'sunflower', wateringPeriod: 11 }, 
        { id: 1, name: 'succulent', wateringPeriod: 14 }, 
        { id: 1, name: 'snapdragon', wateringPeriod: 4 }
      ],
      bots: [
        {id: 1, name: 'office', connection: 'url1'}, 
        {id: 2,  name: 'kitchen', connection: 'url2'}, 
        {id: 3, name: 'living room', connection: 'url3'}
      ]
    })
  }

  fetchPastPlants() {
    fetch('localhost:3000/planthistory')
      .then(results => results.json())
      .then(data => this.setState({pastPlants: data}))
      .catch(error => console.error('Error fetching plants:', error))
  }

  fetchBots() {
    fetch('localhost:3000/botregistry')
      .then(results => results.json())
      .then(data => this.setState({ bots: data, selectedBotId: data[0].id}))
      .catch(error => console.error('Error fetching bots:', error))

  }

  updateSelectedBot(event) {
    this.setState({selectedBotId: Number(event.target.value)})
  }

  updateWateringPeriod(event) {
    this.setState({wateringPeriod: Number(event.target.value)});
  }

  submitUpdatedPeriod(event) {
    event.preventDefault();
    console.log('submitting new watering period')
    const data = {
      botId: this.state.selectedBotId,
      wateringPeriod: this.state.wateringPeriod
    }

    console.log(data);
    
    // fetch(`localhost:3000/botregistry/${this.state.botId}`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    //   .then(response => console.log('Success:', JSON.stringify(response)))
    //   .catch(error => console.error('Error:', error));
  }

  toggleFormType() {
    this.setState({manual: !this.state.manual})
  }

  renderBotOptions() {
    return this.state.bots.map(bot => {
      return <option key={bot.id} value={bot.id}>{bot.name}</option>
    })
  }

  renderForm() {
    return (
      <div>
        <form onSubmit={this.submitUpdatedPeriod}>
          <select name="bot-select" id="" onChange={this.updateSelectedBot}>
            {this.renderBotOptions()}
          </select>
          {this.state.manual ? 
            <input type="number" onChange={this.updateWateringPeriod}/>
            : <AutoConfigForm pastPlants={this.state.pastPlants}/>}
          <input type="submit"/>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        <button className="toggleConfigForm" onClick={this.toggleFormType}>
          {this.state.manual? 'configure with tools' : 'manual configuration'}
        </button>
      </div>
    )
  }
}

export default Configuration;