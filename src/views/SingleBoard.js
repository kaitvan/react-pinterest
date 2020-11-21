import React, { Component } from 'react';
import pinsData from '../helpers/data/pinsData';
import boardsData from '../helpers/data/boardsData';
import PinCard from '../components/card/pinsCard';
import BoardForm from '../components/forms/BoardForm';
import AppModal from '../components/appModal';
import PinForm from '../components/forms/PinForm';

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

    this.findMatchingPins(boardFirebaseKey).then((pinArray) => {
      this.setState({ pins: pinArray });
    });
  }

  findMatchingPins = (boardFirebaseKey) => pinsData.getBoardPins(boardFirebaseKey).then((response) => {
    console.warn('board firebaseKey', boardFirebaseKey, 'getBoardPins response', response);
    const pinArray = [];
    response.forEach((item) => {
      pinArray.push(pinsData.getPin(item.pinId));
    });
    return Promise.all([...pinArray]);
  });

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
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.findMatchingPins} />}
        </AppModal>
        <AppModal title={'Add Pin'} buttonLabel={'Add Pin'}>
        {<PinForm board={board} onUpdate={this.findMatchingPins}/>}
        </AppModal>
        <h1>{board.name}</h1>
        <div className='card-container'>{renderPins()}</div>
      </div>
    );
  }
}

export default SingleBoard;
