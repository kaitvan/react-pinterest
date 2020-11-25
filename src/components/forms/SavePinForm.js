import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FormGroup, Label, Input } from 'reactstrap';
import getUser from '../../helpers/data/authData';
import PinData from '../../helpers/data/pinsData';
import pinsBoardsData from '../../helpers/data/pinsBoardsData';

class SavePinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    private: this.props.pin?.private || false,
    boardId: this.props.boards[0].firebaseKey,
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
    } else if (e.target.name === 'private') {
      e.target.value === 'on' ? this.setState({ private: true }) : this.setState({ private: false });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const pinObject = {
      firebaseKey: this.state.firebaseKey,
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      userId: this.state.userId,
      description: this.state.description,
      private: this.state.private,
    };

    PinData.createPin(pinObject)
      .then((response) => {
        const pinToBoardObject = {
          boardId: this.state.boardId,
          pinId: response.data.firebaseKey,
          userId: this.state.userId,
        };
        pinsBoardsData.addPinToBoard(pinToBoardObject).then(() => this.props.onUpdate());
      });
  }

  render() {
    const { boards } = this.props;
    const showBoardOptions = () => (
      boards.map((board) => <option value={board.firebaseKey}>{board.name}</option>)
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
          <Input type="select" name="boardId" id="board" onChange={this.handleChange}>
            {showBoardOptions()}
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label for="private" check>Private</Label>
          <Input type="checkbox" name="private" id="private" onChange={this.handleChange}/>
        </FormGroup>
        <button>Submit</button>
      </form>
    );
  }
}

export default SavePinForm;
