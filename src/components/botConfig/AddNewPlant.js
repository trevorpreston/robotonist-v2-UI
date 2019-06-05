import React, { Component } from 'react';


class AddNewPlant extends Component {
  constructor() {
    super();
    this.state = {
      plantName: null,
      soilMoisture: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlantName = this.updatePlantName.bind(this);
    this.updateSoilMoisture = this.updateSoilMoisture.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    /* disabled until API is finished */

    // const data = {
    //   plantName: this.state.plantName,
    //   soilMoisture: this.state.soilMoisture
    // }
    // fetch(`localhost:3000/plants/`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    //   .then(response => console.log('Success:', JSON.stringify(response)))
    //   .catch(error => console.error('Error:', error));
  }

  updatePlantName(event) {
    this.setState({plantName: event.target.value});
  }

  updateSoilMoisture(event) {
    this.setState({soilMoisture: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          plant name:
          <input type="text" name="search-plant" onChange={this.updatePlantName}/>
        </label>
        <label>
          soil moisture:
          <input type="text" name="token" onChange={this.updateSoilMoisture}/>
        </label>
        <input type="submit"/>
      </form>
    )
  }
}

export default AddNewPlant;