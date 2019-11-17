import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../services/auth.service';

function PrivateRoute({ children, ...rest }) {
  console.log('Private Route')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        false ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute