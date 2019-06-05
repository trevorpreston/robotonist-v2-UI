import React, { Component } from 'react';

class AutoConfigForm extends Component {
  render() {
    return(
        <div>
          <label>
            Soil Moisture:
            <input type="text" onChange={this.props.updateSoilMoisture}/>
          </label>
          <div className="addNew" onClick={this.props.toggleAddNewPlant}>add new plant</div>
        </div>
      )
    };
}


export default AutoConfigForm;