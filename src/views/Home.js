import React from 'react';
import Auth from '../components/auth';

export default function Home({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <h1>Put all public boards here.</h1>;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1>Home Page</h1>
      {loadComponent()}
    </div>
  );
}
