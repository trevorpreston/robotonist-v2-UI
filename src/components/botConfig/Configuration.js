import React, { Component } from 'react';
import AutoConfigForm from './AutoConfigForm';
import ManualConfigForm from './ManualConfigForm'

class Configuration extends Component {
  constructor() {
    super();
    this.state = { 
      manual: false,
      wateringPeriod: 0,
      pastPlants: []
    }
  }

  componentDidMount() {
    // fetchPastPlants();  
    this.setState({  // use dummy data until API is ready.
      pastPlants: [{plant1: 7}, {plant2: 3}, {plant3: 11}, {plant4: 9}, {plant5: 4}]
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

  renderForm() {
    return this.state.manual ? <ManualConfigForm/> : <AutoConfigForm/>
  }

  toggleFormType() {
    this.setState({manual: !this.state.manual})
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