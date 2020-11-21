import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import PinData from '../../helpers/data/pinsData';
import pinsBoardsData from '../../helpers/data/pinsBoardsData';

class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    private: this.props.pin?.private || false,
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      PinData.createPin(this.state)
        .then((response) => {
          const pinToBoardObject = {
            boardId: this.props.board.firebaseKey,
            pinId: response.data.firebaseKey,
            userId: this.state.userId,
          };
          pinsBoardsData.addPinToBoard(pinToBoardObject);
        }).then(() => {
          console.warn('board firebaseKey', this.props.board.firebaseKey);
          this.props.onUpdate(this.props.board.firebaseKey);
          console.warn('starting onUpdate');
        });
    } else {
      PinData.updatePin(this.state)
        .then(() => {
          this.props.onUpdate(this.props.board.firebaseKey);
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add Pin Form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Pin Description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default PinForm;
