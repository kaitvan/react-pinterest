import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppModal from '../appModal';
import PinForm from '../forms/PinForm';
import SavePinForm from '../forms/SavePinForm';

class PinCard extends Component {
  render() {
    const {
      pin,
      onDelete,
      onUpdate,
      home,
      boards,
    } = this.props;

    return (
      <div className="card m-2" id={pin.firebaseKey} style={ { width: '300px' } } >
        <img className="card-img-top" src={pin.imageUrl} alt={pin.description}></img>
        <div className="card-body">
          <h5 className="card-title">{pin.name}</h5>
          { home ? (
          <>
            <AppModal title={'Save Pin'} buttonLabel={'Save Pin'}>
            { Object.keys(pin).length && <SavePinForm pin={pin} onUpdate={onUpdate} boards={boards} save={true} />}
            </AppModal>
            <Link className="btn btn-primary" to={`/pin/${pin.firebaseKey}`}>View Pin Details</Link>
          </>
          ) : (
          <>
            <Link className="btn btn-primary" to={`/pin/${pin.firebaseKey}`}>View Pin Details</Link>
            <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
            { Object.keys(pin).length && <PinForm pin={pin} onUpdate={onUpdate} board={this.props.board}/>}
            </AppModal>
            <Button id={pin.firebaseKey} color="danger" onClick={onDelete}>Delete Pin</Button>
          </>
          )}
        </div>
      </div>
    );
  }
}

export default PinCard;
