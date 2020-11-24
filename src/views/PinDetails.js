import React, { Component } from 'react';
import PinData from '../helpers/data/pinsData';

class PinDetails extends Component {
  state = {
    pin: {},
  }

  componentDidMount() {
    const pinFirebaseKey = this.props.match.params.id;
    PinData.getPin(pinFirebaseKey).then((response) => {
      this.setState({
        pin: response,
      });
    });
  }

  render() {
    const { pin } = this.state;
    return (
      <div>
      <h1>{pin.name}</h1>
      <img src={pin.imageUrl} alt={pin.description}/>
      <p>{pin.description}</p>
    </div>
    );
  }
}

export default PinDetails;
