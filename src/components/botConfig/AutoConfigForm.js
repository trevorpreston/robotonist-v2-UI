import React, {Component} from 'react';

class AutoConfigForm extends Component {
  renderPastPlants() {
    return (
      this.props.pastPlants.map(plant => {
        return <option value={plant.id}>{plant.name}</option>
      })
    )
  }
  render() {
    return(
      <div>
        <p>auto config</p>
        <form>
          <select>
            {this.renderPastPlants()}
          </select>
        </form>
      </div>
    )
  }
};

export default AutoConfigForm;