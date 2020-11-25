import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class BoardCard extends Component {
  render() {
    const { board, onDelete } = this.props;

    return (
      <div className="card m-2" id={board.firebaseKey} style={ { width: '300px' } } >
        <img className="card-img-top" src={board.imageUrl} alt={board.description}></img>
        <div className="card-body">
          <h5 className="card-title">{board.name}</h5>
          <p className="card-text">{board.description}</p>
          <Link className="btn btn-primary" to={`/boards/${board.firebaseKey}`}>View Pins</Link>
          <Button id={board.firebaseKey} color="danger" onClick={onDelete}>Delete Board</Button>
        </div>
      </div>
    );
  }
}

export default BoardCard;
