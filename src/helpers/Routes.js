import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import PinDetails from '../views/PinDetails';
import NotFound from '../views/NotFound';
import SearchResults from '../views/SearchResults';

export default function Routes({ user }) {
  return (
      <Switch>
        <Route exact path='/' component={() => <Home user={user} />} />
        <PrivateRoute exact path='/boards' component={Boards} user={user} />
        <PrivateRoute exact path='/pins' component={Pins} user={user} />
        <PrivateRoute exact path='/boards/:id' component={SingleBoard} user={user} />
        <PrivateRoute exact path='/pin/:id' component={PinDetails} user={user} />
        <Route exact path='/search/:term/:type' component={(props) => <SearchResults {...props} user={user}/>} />
        <Route component={NotFound} />
      </Switch>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }}/>));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
