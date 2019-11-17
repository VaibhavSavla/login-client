import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import PrivateRoute from './PrivateRoute'

class App extends React.Component {
  render = () => {
    return (
      <Switch>
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/"><HomePage /></PrivateRoute>
      </Switch>
    )
  }
}

export default App;