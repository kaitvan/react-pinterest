import React, { Component } from 'react';
import BoardsCard from '../components/card/boardsCard';
import Loader from '../components/loader';
import getUid from '../helpers/data/authData';
import BoardsData from '../helpers/data/boardsData';
import BoardForm from '../components/forms/BoardForm';
import AppModal from '../components/appModal';
import PinsBoardsData from '../helpers/data/pinsBoardsData';

class Boards extends Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    BoardsData.getAllUserBoards(currentUserId).then((response) => {
      this.setState({ boards: response }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  deleteBoard = (e) => {
    BoardsData.deleteBoard(e.target.id).then(() => {
      PinsBoardsData.deleteBoard(e.target.id).then(() => {
        const updatedBoardsArray = this.state.boards.filter((board) => board.firebaseKey !== e.target.id);
        this.setState({ boards: updatedBoardsArray });
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} onDelete={this.deleteBoard}/>)
    );

    return (
      <div>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
            <BoardForm onUpdate={this.getBoards}/>
          </AppModal>
          <h1>Boards</h1>
          <div className='card-container'>
          {showBoards()}
          </div>
          </>
        )}
      </div>
    );
  }
}

export default Boards;
