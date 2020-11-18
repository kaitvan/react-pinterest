import React, { Component } from 'react';
import BoardCard from '../components/card/boardsCard';
import PinCard from '../components/card/pinsCard';

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
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;

    if (searchType === 'boards') {
      // Make an API call that gets the boards with the search term using .filter
      this.setState({
        searchType,
        searchTerm,
        // results
      });
    } else {
      // Make an API call that gets the boards with the search term using .filter
      this.setState({
        searchTerm,
        searchType,
        // results
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
        <div>
          {showResults()}
        </div>
      </div>
    );
  }
}

export default SearchResults;
