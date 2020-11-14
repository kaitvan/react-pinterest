import React from 'react';
import BoardContainer from '../components/boardContainer';
import Auth from '../components/auth';

export default function Boards({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1>Boards</h1>
      {loadComponent()}
    </div>
  );
}
