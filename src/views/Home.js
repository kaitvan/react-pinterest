import React, { Component } from 'react';
import Auth from '../components/auth';
import PinsData from '../helpers/data/pinsData';
import PinCard from '../components/card/pinsCard';
import Loader from '../components/loader';
import PinsBoardsData from '../helpers/data/pinsBoardsData';

class Home extends Component {
  state = {
    pins: [],
    loading: true,
  }

  componentDidMount() {
    this.getPublicPins();
  }

  getPublicPins = () => {
    PinsData.getAllPublicPins().then((pinsArray) => {
      this.setState({ pins: pinsArray }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  deletePin = (e) => {
    PinsData.deletePin(e.target.id).then(() => {
      PinsBoardsData.deletePinFromBoard(e.target.id).then(() => {
        const updatedArray = this.state.pins.filter((pin) => pin.firebaseKey !== e.target.id);
        this.setState({ pins: updatedArray });
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { user } = this.props;
    const { pins, loading } = this.state;
    const loadComponent = () => {
      let component = '';
      const showPublicPins = () => (
        pins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} onDelete={this.deletePin} />)
      );

      if (user) {
        component = <><div className='card-container'>{showPublicPins()}</div></>;
      } else {
        component = <Auth />;
      }
      return component;
    };

    return (
      <div>
      { loading ? (
        <Loader />
      ) : (
        <>
        <h1>Home Page</h1>
        {loadComponent()}
        </>
      )}
    </div>
    );
  }
}

export default Home;
