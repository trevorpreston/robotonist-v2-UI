import React, { Component } from 'react';

class QuickConfiguration extends Component {
  constructor(props){
    super(props);
    this.updateBotSettings = this.updateBotSettings.bind(this);
  }

  updateBotSettings(event) {
    console.log(event.target.value)
    this.props.updateBotSettings(this.props.availablePlants[event.target.value]);
  }

  render() {
    return(
        <div className="auto-config">
          <label htmlFor="avail-plants">select plant:</label>
          <select name="avail-plants" className="avail-plants" size="3" onChange={this.updateBotSettings}>
          {this.props.availablePlants.map( (plant, index) => {
            return <option className="prev-plant" key={index} value={index}>{plant.name}</option>
          })}
          </select>
        </div>
      )
    };
}


export default QuickConfiguration;