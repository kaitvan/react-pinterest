import React, { Component } from 'react';
import Auth from '../components/auth';
import PinsData from '../helpers/data/pinsData';
import PinCard from '../components/card/pinsCard';
import Loader from '../components/loader';
import PinsBoardsData from '../helpers/data/pinsBoardsData';
import BoardsData from '../helpers/data/boardsData';
import getUid from '../helpers/data/authData';

class Home extends Component {
  state = {
    pins: [],
    loading: true,
    boards: [],
  }

  componentDidMount() {
    this.getPublicPins();
    this.getBoards();
  }

  getPublicPins = () => {
    PinsData.getAllPublicPins().then((pinsArray) => {
      this.setState({ pins: pinsArray }, this.setLoading);
    });
  }

  getBoards = () => {
    const currentUserId = getUid();
    BoardsData.getAllUserBoards(currentUserId).then((response) => {
      this.setState({ boards: response });
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
    const { pins, loading, boards } = this.state;
    const loadComponent = () => {
      let component = '';
      const showPublicPins = () => (
        pins.map((pin) => <PinCard key={pin.firebaseKey} home={true} onUpdate={this.getBoards} boards={boards} pin={pin} onDelete={this.deletePin} />)
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
        <h1>Home</h1>
        {loadComponent()}
        </>
      )}
    </div>
    );
  }
}

export default Home;
