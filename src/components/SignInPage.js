import React from "react";
import { withRouter } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthService from "../services/auth.service";

class SignInPage extends React.Component {
  state = {};

  render = () => {
    return (
      <form autoComplete="off">
        <TextField
          label="Email"
          margin="normal"
          variant="outlined"
          name="email"
          onChange={this.handleChange}
        />
        <TextField
          label="Password"
          margin="normal"
          variant="outlined"
          name="password"
          onChange={this.handleChange}
        />
        <Button onClick={this.signIn} variant="contained" color="primary">
          SIGN IN
        </Button>
      </form>
    );
  };

  handleChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    });
  };

  signIn = async () => {
    const response = await AuthService.login({
      email: this.state.email,
      password: this.state.password
    });

    console.log(response.status)
    if (response.status === 200) {
      this.props.history.push('/')
    }
  };
}

export default withRouter(SignInPage);
