import React, { Component } from 'react';
import pinsData from '../helpers/data/pinsData';
import boardsData from '../helpers/data/boardsData';
import PinCard from '../components/card/pinsCard';
import BoardForm from '../components/forms/BoardForm';
import AppModal from '../components/appModal';
import PinForm from '../components/forms/PinForm';
import Loader from '../components/loader';

class SingleBoard extends Component {
  state = {
    board: {},
    pins: [],
    loading: true,
  }

  componentDidMount() {
    const boardFirebaseKey = this.props.match.params.id;
    boardsData.getSingleBoard(boardFirebaseKey).then((response) => {
      this.setState({
        board: response,
      });
    });

    this.findMatchingPins(boardFirebaseKey);
  }

  findMatchingPins = (boardFirebaseKey) => pinsData.getBoardPins(boardFirebaseKey).then((response) => {
    const pinArray = [];
    response.forEach((item) => {
      pinArray.push(pinsData.getPin(item.pinId));
    });
    Promise.all([...pinArray]).then((array) => {
      this.setState({ pins: array }, this.setLoading);
    });
  });

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins, board, loading } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
        <PinCard key={pin.firebaseKey} pin={pin} />
      ))
    );

    return (
      <div>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
          { Object.keys(board).length && <BoardForm board={board} onUpdate={this.findMatchingPins} />}
          </AppModal>
          <AppModal title={'Add Pin'} buttonLabel={'Add Pin'}>
          {<PinForm board={board} onUpdate={this.findMatchingPins}/>}
          </AppModal>
          <h1>{board.name}</h1>
          <div className='card-container'>{renderPins()}</div>
          </>
        )}
      </div>
    );
  }
}

export default SingleBoard;
