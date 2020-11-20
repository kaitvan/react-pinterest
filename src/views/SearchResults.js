import React, { Component } from 'react';
import BoardCard from '../components/card/boardsCard';
import PinCard from '../components/card/pinsCard';
import BoardsData from '../helpers/data/boardsData';
import PinsData from '../helpers/data/pinsData';
import getUid from '../helpers/data/authData';

class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: '',
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term.toLowerCase();
    const searchType = this.props.match.params.type;
    const currentUser = getUid();

    if (searchType === 'boards') {
      BoardsData.getAllUserBoards(currentUser).then((boardsArray) => {
        const boardResults = boardsArray.filter((board) => board.name.toLowerCase().includes(searchTerm) || board.description.toLowerCase().includes(searchTerm));
        this.setState({
          searchType,
          searchTerm,
          results: boardResults,
        });
      });
    } else {
      PinsData.getAllUserPins(currentUser).then((pinsArray) => {
        const pinResults = pinsArray.filter((pin) => pin.name.toLowerCase().includes(searchTerm) || pin.description.toLowerCase().includes(searchTerm));
        this.setState({
          searchTerm,
          searchType,
          results: pinResults,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render() {
    const { results, searchType } = this.state;
    const showResults = () => (
      results.map((result) => (
        searchType === 'boards' ? <BoardCard key={result.firebaseKey} board={result}/> : <PinCard key={result.firebaseKey} pin={result}/>
      ))
    );

    return (
      <div>
        <h1>Search Results</h1>
        <div className='card-container'>
          {showResults()}
        </div>
      </div>
    );
  }
}

export default SearchResults;
