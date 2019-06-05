import React, { Component } from 'react';
import './BotConfig.scss';

import AutoConfigForm from './AutoConfigForm';
import AddNewPlant from './AddNewPlant';

class Configuration extends Component {
  constructor() {
    super();
    this.state = {
      manual: false,
      addNewPlant: false,
      availablePlants: [],
      bots: [],
      selectedBotId: undefined,
      soilMoisture: undefined,
      wateringFrequency: undefined
    }

    this.updateSelectedBot = this.updateSelectedBot.bind(this);
    this.submitBotUpdate = this.submitBotUpdate.bind(this);
    this.submitUpdatedPeriod = this.submitUpdatedPeriod.bind(this);
    this.updateWateringFrequency = this.updateWateringFrequency.bind(this);
    this.updateSoilMoisture = this.updateSoilMoisture.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
    this.toggleAddNewPlant = this.toggleAddNewPlant.bind(this);
  }

  componentDidMount() {
    // fetchAvailablePlants();  
    // fetchBots();

    /* NOTE: using dummy data until API is complete. */
    this.setState({  
      availablePlants: [
        { id: 1, name: 'orchid', soilMoisture: 7 }, 
        { id: 6, name: 'sunflower', soilMoisture: 11 }, 
        { id: 2, name: 'succulent', soilMoisture: 14 }, 
        { id: 11, name: 'snapdragon', soilMoisture: 4 }
      ],
      bots: [
        {id: 1, name: 'office', connection: 'url1'}, 
        {id: 2,  name: 'kitchen', connection: 'url2'}, 
        {id: 3, name: 'living room', connection: 'url3'}
      ],
      selectedBotId: 3
    })
  }

  fetchAvailablePlants() {
    fetch('localhost:3000/planthistory')
      .then(results => results.json())
      .then(data => this.setState({availablePlants: data}))
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

  updateWateringFrequency(event) {
    this.setState({wateringFrequency: Number(event.target.value)})
  }

  updateSoilMoisture(event) {
    this.setState({soilMoisture: Number(event.target.value)})
  }

  submitBotUpdate(event) {
    event.preventDefault();
    this.state.manual ? this.submitUpdatedPeriod() : this.submitUpdatedSoilMoisture()
  }

  submitUpdatedPeriod() {
    const data = {
      botId: this.state.selectedBotId,
      wateringFrequency: this.state.wateringFrequency
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
  submitUpdatedSoilMoisture() {
    console.log('submitting new watering period')
    const data = {
      botId: this.state.selectedBotId,
      soilMoisture: this.state.soilMoisture
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
    if (this.state.manual === false) {
      this.setState({addNewPlant: false});
    }

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
        <form onSubmit={this.submitBotUpdate}>
          <select name="bot-select" id="" onChange={this.updateSelectedBot}>
            {this.renderBotOptions()}
          </select>
          {this.state.manual ?
            <input type="number" onChange={this.updateWateringFrequency}/> :
            <AutoConfigForm 
              availablePlants={this.state.availablePlants} 
              updateSoilMoisture={this.updateSoilMoisture}
              toggleAddNewPlant={this.toggleAddNewPlant}
            />}
          <input type="submit"/>
        </form>
        {this.state.addNewPlant && <AddNewPlant/>}
      </div>
    )
  }

  toggleAddNewPlant() {
    this.setState({addNewPlant: !this.state.addNewPlant});
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