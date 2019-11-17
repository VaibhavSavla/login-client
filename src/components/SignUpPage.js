import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthService from "../services/auth.service";

class SignUpPage extends React.Component {
  state = {};

  render = () => {
    return (
      <form autoComplete="off">
        <TextField
          label="First Name"
          margin="normal"
          variant="outlined"
          name="firstName"
          onChange={this.handleChange}
        />
        <TextField
          label="Last Name"
          margin="normal"
          variant="outlined"
          name="lastName"
          onChange={this.handleChange}
        />
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
        <TextField
          label="Confirm Password"
          margin="normal"
          variant="outlined"
          name="confirmPassword"
          onChange={this.handleChange}
        />
        <Button onClick={this.signUp} variant="contained" color="primary">
          SIGN UP
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

  signUp = async () => {
    await AuthService.register({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  };
}

export default SignUpPage;
