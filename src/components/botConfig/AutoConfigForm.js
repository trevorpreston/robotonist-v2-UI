import React, { Component } from 'react';

class AutoConfigForm extends Component {
  render() {
    return(
        <div>
          <p>auto config</p>
          <select name="plant-select" onChange={this.props.updateSoilMoisture}>
          { this.props.availablePlants.map(plant => {
            return <option key={plant.id} value={plant.soilMoisture}>{ plant.name } -- last setting: {plant.soilMoisture} ml/cm</option>
          }) }
          </select>
          <div className="addNew" onClick={this.props.toggleAddNewPlant}>add new plant</div>
        </div>
      )
    };
}


export default AutoConfigForm;