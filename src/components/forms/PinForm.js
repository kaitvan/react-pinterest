import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FormGroup, Label, Input } from 'reactstrap';
import getUser from '../../helpers/data/authData';
import PinData from '../../helpers/data/pinsData';
import pinsBoardsData from '../../helpers/data/pinsBoardsData';
import BoardsData from '../../helpers/data/boardsData';

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
          pinsBoardsData.addPinToBoard(pinToBoardObject).then(() => this.props.onUpdate(this.props.board.firebaseKey));
        });
    } else {
      PinData.updatePin(this.state)
        .then(() => {
          this.props.onUpdate(this.props.board.firebaseKey);
        });
    }
  }

  getBoards = () => {
    const currentUserId = getUser();
    BoardsData.getAllUserBoards(currentUserId).then((response) => response);
  }

  render() {
    const showBoardOptions = () => (
      this.getBoards().map((board) => <option value={board.firebaseKey}>{board.name}</option>)
    );

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
        <FormGroup>
          <Label for="board">Select A Board</Label>
          <Input type="select" name="select" id="board">
            {console.warn(this.getBoards())}
            {showBoardOptions()}
          </Input>
        </FormGroup>
        <button>Submit</button>
      </form>
    );
  }
}

export default PinForm;
