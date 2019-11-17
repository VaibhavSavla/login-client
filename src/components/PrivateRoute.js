import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
  console.log('Private Route', rest)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.isAuthenticated ? (
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