import React, { Component } from 'react';
import pinsData from '../helpers/data/pinsData';
import boardsData from '../helpers/data/boardsData';
import PinCard from '../components/card/pinsCard';
import BoardForm from '../components/forms/BoardForm';

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

    this.findMatchingPins(boardFirebaseKey)?.then((resp) => (
      this.setState({ pins: resp })
    ));
  }

  // Make a call to the API that returns the pins associated with this board.
  // Put the array of pins in state. (convert this to a class-based component)
  // Render the pins on the DOM.

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
        <BoardForm board={board} onUpdate={this.getBoardInfo}/>
        <h1>{board.name}</h1>
        {renderPins()}
      </div>
    );
  }
}

export default SingleBoard;
