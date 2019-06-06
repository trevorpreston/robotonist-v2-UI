import React, { Component } from 'react';
import Switch from "react-switch";


class ManualConfiguration extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div>
        <label htmlFor="timed-input">set watering period</label>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#81C84B"
          offColor="#cdffa8"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={80}
        />
        <input type="number" name="timed-input" onChange={this.updateWateringFrequency}/>
      </div>
    )
  }
}

export default ManualConfiguration;