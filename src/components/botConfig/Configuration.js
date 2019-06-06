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
      selectedBot: undefined,
      botSettings: {
        wateringType: 'soilMoisture',
        wateringValue: 8
      }
    }

    this.updateSelectedBot = this.updateSelectedBot.bind(this);
    this.updateBotSettings = this.updateBotSettings.bind(this);
    this.submitBotUpdate = this.submitBotUpdate.bind(this);
    this.toggleFormType = this.toggleFormType.bind(this);
  }

  componentDidMount() {
    // fetchAvailablePlants();  
    // fetchBots();

    /* NOTE: using dummy data until API is complete. 
    The following will be removed once shipped*/
    this.setState({
      availablePlants: [
        { id: 1, name: 'orchid', wateringType: 'soilMoisture', wateringValue: 7 }, 
        { id: 6, name: 'sunflower', wateringType: 'wateringPeriod', wateringValue: 11 }, 
        { id: 2, name: 'succulent', wateringType: 'wateringPeriod', wateringValue: 14 }, 
        { id: 11, name: 'snapdragon', wateringType: 'soilMoisture', wateringValue: 4 }
      ],
      bots: [
        {id: 1, name: 'office'}, 
        {id: 2,  name: 'kitchen'}, 
        {id: 3, name: 'living room'}
      ],
      selectedBot: {value: 1, label: 'office'}
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
      .then(data => (
        this.setState({ 
          bots: data, 
          selectedBot: {
            value: data[0].id, 
            label: data[0].name
          }
        })))
      .catch(error => console.error('Error fetching bots:', error))
  }

  updateSelectedBot(selectedOption) {
    console.log(selectedOption.value)
    this.setState({selectedBot: selectedOption});
  }

  updateBotSettings(newSetting) {
    this.setState({
      botSettings: {
        wateringType: newSetting.wateringType,
        wateringValue: newSetting.wateringValue}
    })
  }

  submitBotUpdate(event) {
    event.preventDefault();
    console.log('submitting new watering period')
    const data = {
      botId: this.state.selectedBot.value,
      wateringType: this.state.botSettings.wateringType,
      wateringValue: this.state.botSettings.wateringValue
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
    return (
      <div className="bot-config-container">
        <form onSubmit={this.submitBotUpdate}>
            <span>select bot:</span>
            <Select
              className="select-bot"
              value={this.state.selectedBot}
              onChange={this.updateSelectedBot}
              options={this.state.bots.map(bot => this.renameKeys({id: 'value', name: 'label'}, bot))}
            />
          {this.state.manual ?
            <ManualConfiguration/>:
            <QuickConfiguration 
              availablePlants={this.state.availablePlants} 
              updateSelectedBot={this.state.updateSelectedBot}
              updateBotSettings={this.updateBotSettings}
              toggleAddNewPlant={this.toggleAddNewPlant}
            />}

          <input type="submit"/>
        </form>
      </div>
    )
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