import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('accessToken') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
}
