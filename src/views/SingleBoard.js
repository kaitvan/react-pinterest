import React, { Component } from 'react';
import pinsData from '../helpers/data/pinsData';
import boardsData from '../helpers/data/boardsData';
import PinCard from '../components/card/pinsCard';
import BoardForm from '../components/forms/BoardForm';
import AppModal from '../components/appModal';

class SingleBoard extends Component {
  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const boardFirebaseKey = this.props.match.params.id;
    boardsData.getSingleBoard(boardFirebaseKey).then((response) => {
      this.setState({
        board: response,
      });
    });

    this.findMatchingPins(boardFirebaseKey).then((pinArray) => (
      this.setState({ pins: pinArray })
    )).catch((error) => console.warn(error));

    console.warn('state', this.state);
  }

  findMatchingPins = (boardFirebaseKey) => {
    pinsData.getBoardPins(boardFirebaseKey).then((response) => {
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(pinsData.getPin(item.pinId));
      });
      return Promise.all([...pinArray]);
    });
  };

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
        <PinCard key={pin.firebaseKey} pin={pin} />
      ))
    );

    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <h1>{board.name}</h1>
        {renderPins()}
      </div>
    );
  }
}

export default SingleBoard;
