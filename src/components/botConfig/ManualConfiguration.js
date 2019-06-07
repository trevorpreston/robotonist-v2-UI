import React, { Component } from 'react';
import Switch from "react-switch";


class ManualConfiguration extends Component {
  constructor() {
    super();
    this.state = { 
      checked: false,
    };

    this.updateWateringType = this.updateWateringType.bind(this);
  }

  componentDidMount() {
    this.props.updateBotSettings({wateringType: 'soilMoisture'});
  }
 
  updateWateringType( checked ) {
    console.log('click');
    const newWateringType = checked ? 'soilMoisture' : 'wateringPeriod'

    console.log(newWateringType)
    this.setState({ 
      checked: checked,
    });

    this.props.updateBotSettings({wateringType: newWateringType})
  }

  render() {
    return (
      <div className="manual-config">
        <div className="watering-type">
          <div className="watering-type-toggle">
            <span className={this.state.checked ? '' : 'active'} onClick={() => {this.updateWateringType(!this.state.checked)}}>frequency</span>
            <label htmlFor="watering-type">
              <Switch
                checked={this.state.checked}
                onChange={() => {this.updateWateringType(!this.state.checked)}}
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
            </label>
            <span className={this.state.checked ? 'active' : ''} onClick={this.updateWateringType}>soil moisture</span>
          </div>
        </div>
        <div className="watering-value-container">
          <input type="number" name="watering-value" onChange={(event) => {this.props.updateBotSettings({wateringValue: event.target.value})}}/><label htmlFor="watering-value">{this.state.checked ? 'mL/cm' : 'days'}</label>
        </div>
      </div>
    )
  }
}

export default ManualConfiguration;