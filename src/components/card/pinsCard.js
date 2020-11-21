import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PinsData from '../../helpers/data/pinsData';
import PinsBoardsData from '../../helpers/data/pinsBoardsData';

class PinCard extends Component {
  deletePin = (e) => {
    PinsData.deletePin(e.target.id);
    PinsBoardsData.deletePinFromBoard(e.target.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card m-2" id={pin.firebaseKey} style={ { width: '300px' } } >
        <img className="card-img-top" src={pin.imageUrl} alt={pin.description}></img>
        <div className="card-body">
          <h5 className="card-title">{pin.name}</h5>
          <p className="card-text">{pin.description}</p>
          <Button id={pin.firebaseKey} color="danger" onClick={this.deletePin}>Delete Pin</Button>
        </div>
      </div>
    );
  }
}

export default PinCard;
