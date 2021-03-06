import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import PrivateRoute from './PrivateRoute'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.user
  }

  render = () => {
    console.log(this.props.user)
    return (
      <Switch>
        <Route path="/signin">
          <LoginPage mode="signin" user={this.state} setUser={this.setUser} />
        </Route>
        <Route path="/signup">
          <LoginPage mode="signup" user={this.state} setUser={this.setUser} />
        </Route>
        <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/">
          <HomePage user={this.state} setUser={this.setUser} />
        </PrivateRoute>
      </Switch>
    )
  }

  setUser = (user) => {
    this.setState(user)
  }
}

export default App;