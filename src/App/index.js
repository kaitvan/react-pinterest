import React from 'react';
import firebase from 'firebase/app';
import fbConnection from '../helpers/data/connection';

import MyNavbar from '../components/myNavbar';
import Routes from '../helpers/Routes';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <Routes authed={authed} />
      </div>
    );
  }
}

export default App;
