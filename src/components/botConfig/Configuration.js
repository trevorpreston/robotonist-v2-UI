import React, { Component } from 'react';
import Select from 'react-select';
import './BotConfig.scss';

import QuickConfiguration from './QuickConfiguration';
import AddNewPlant from './AddNewPlant';
import ManualConfiguration from './ManualConfiguration';

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
      wateringFrequency: undefined,
      value:"one"
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
        {id: 1, name: 'office'}, 
        {id: 2,  name: 'kitchen'}, 
        {id: 3, name: 'living room'}
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

  updateSelectedBot(selectedOption) {
    console.log(selectedOption.value)
    this.setState({selectedBotId: selectedOption});
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

  renameKeys(keysMap, obj) {  // changes keys of an object
    return (
      Object.keys(obj)
      .reduce((acc, key) => ({
          ...acc,
          ...{ [keysMap[key] || key]: obj[key] }
      }), {})
    )
  }

  renderForm() {
    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];
    return (
      <div className="bot-config-container">
        <form onSubmit={this.submitBotUpdate}>
            <span>select bot:</span>
            <Select
              className="select-bot"
              value={this.state.selectedBotId}
              // value={this.state.value}

              onChange={this.updateSelectedBot}
              // onChange={this.updateState.bind(this)}

              // options={options}
              options={this.state.bots.map(bot => this.renameKeys({id: 'value', name: 'label'}, bot))}
            />
          {this.state.manual ?
            <ManualConfiguration/>:
            <QuickConfiguration 
              availablePlants={this.state.availablePlants} 
              updateSelectedBot={this.state.updateSelectedBot}
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

  updateState(element) {
    this.setState({value: element});
  }

  render() {
    console.log(this.state.bots.map(bot => this.renameKeys({id: 'value', name: 'label'}, bot)))

    return (
      <div className="bot-config-wrapper">
        {this.renderForm()}
        <div className="toggleConfigForm" onClick={this.toggleFormType}>
          {this.state.manual? 'quick configuration' : 'manual configuration'}
        </div>
      </div>
    )
  }
}

export default Configuration;