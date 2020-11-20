import React, { Component } from 'react';
import BoardCard from '../components/card/boardsCard';
import Loader from '../components/loader';
import getUid from '../helpers/data/authData';
import BoardData from '../helpers/data/boardsData';
import BoardForm from '../components/forms/BoardForm';
import AppModal from '../components/appModal';

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
    BoardData.getAllUserBoards(currentUserId).then((response) => {
      this.setState({ boards: response }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardCard key={board.firebaseKey} board={board} />)
    );

    return (
      <div>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
            <BoardForm />
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
