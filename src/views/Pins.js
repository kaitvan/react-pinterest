import React, { Component } from 'react';
import PinsData from '../helpers/data/pinsData';
import getUid from '../helpers/data/authData';
import PinCard from '../components/card/pinsCard';
import Loader from '../components/loader';
import PinsBoardsData from '../helpers/data/pinsBoardsData';

class Pins extends Component {
  state = {
    pins: [],
    loading: true,
  }

  componentDidMount() {
    this.getUserPins();
  }

  deletePin = (e) => {
    PinsData.deletePin(e.target.id).then(() => {
      PinsBoardsData.deletePinFromBoard(e.target.id).then(() => {
        const updatedArray = this.state.pins.filter((pin) => pin.firebaseKey !== e.target.id);
        this.setState({ pins: updatedArray });
      });
    });
  }

  getUserPins = () => {
    const currentUser = getUid();
    PinsData.getAllUserPins(currentUser).then((pinsArray) => {
      this.setState({ pins: pinsArray }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins, loading } = this.state;
    const showPins = () => (
      pins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} onDelete={this.deletePin}/>)
    );

    return (
      <div>
      { loading ? (
        <Loader />
      ) : (
        <>
          <h1>Pins</h1>
          <div className='card-container'>
          {showPins()}
          </div>
        </>
      )}
    </div>
    );
  }
}

export default Pins;
