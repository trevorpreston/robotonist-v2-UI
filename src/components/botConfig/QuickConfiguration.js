import React, { Component } from 'react';

class QuickConfiguration extends Component {
  renderAvailablePlants() {

  }
  render() {
    return(
        <div className="auto-config">
          <label htmlFor="avail-plants">select plant:</label>
          <select name="avail-plants" className="avail-plants" size="3">
          {this.props.availablePlants.map( plant => {
            return <option className="prev-plant" key={plant.id}>{plant.name}</option>
          })}
          </select>
        </div>
      )
    };
}


export default QuickConfiguration;