import React, { Component } from 'react';
import Auth from '../components/auth';
import PinsData from '../helpers/data/pinsData';
import PinCard from '../components/card/pinsCard';
import Loader from '../components/loader';

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

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { user } = this.props;
    const { pins, loading } = this.state;
    const loadComponent = () => {
      let component = '';
      const showPublicPins = () => (
        pins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} />)
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
