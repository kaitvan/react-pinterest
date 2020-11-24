import React, { Component } from 'react';
import { Button } from 'reactstrap';

class PinCard extends Component {
  render() {
    const { pin, onDelete } = this.props;

    return (
      <div className="card m-2" id={pin.firebaseKey} style={ { width: '300px' } } >
        <img className="card-img-top" src={pin.imageUrl} alt={pin.description}></img>
        <div className="card-body">
          <h5 className="card-title">{pin.name}</h5>
          <p className="card-text">{pin.description}</p>
          <Button id={pin.firebaseKey} color="danger" onClick={onDelete}>Delete Pin</Button>
        </div>
      </div>
    );
  }
}

export default PinCard;
