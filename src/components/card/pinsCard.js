import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppModal from '../appModal';
import PinForm from '../forms/PinForm';

class PinCard extends Component {
  render() {
    const { pin, onDelete, onUpdate } = this.props;

    return (
      <div className="card m-2" id={pin.firebaseKey} style={ { width: '300px' } } >
        <img className="card-img-top" src={pin.imageUrl} alt={pin.description}></img>
        <div className="card-body">
          <h5 className="card-title">{pin.name}</h5>
          <Link className="btn btn-primary" to={`/pin/${pin.firebaseKey}`}>View Pin Details</Link>
          <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
          { Object.keys(pin).length && <PinForm pin={pin} onUpdate={onUpdate} board={this.props.board} />}
          </AppModal>
          <Button id={pin.firebaseKey} color="danger" onClick={onDelete}>Delete Pin</Button>
        </div>
      </div>
    );
  }
}

export default PinCard;
