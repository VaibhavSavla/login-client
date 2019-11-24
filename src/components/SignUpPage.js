import React from "react";
import { withRouter, Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AuthService from "../services/auth.service";

class SignUpPage extends React.Component {
  state = {};

  render = () => {
    return (
      <>
        <form className="mt-4" autoComplete="off">
          <div className="container">
            <div className="flex space-between">
              <TextField
                className="width-1-2"
                label="First Name"
                margin="normal"
                variant="outlined"
                name="firstName"
                onChange={this.handleChange}
              />
              <TextField
                className="width-1-2"
                label="Last Name"
                margin="normal"
                variant="outlined"
                name="lastName"
                onChange={this.handleChange}
              />
            </div>
            <h2 className="mb-0">Register With</h2>
            <TextField
              className="width-1-1"
              label="Email"
              margin="normal"
              variant="outlined"
              name="email"
              onChange={this.handleChange}
            />
            <div className="flex align-center password-container">
              <TextField
                className="flex-grow mr-m my-0"
                label="Password"
                margin="normal"
                variant="outlined"
                name="password"
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange}
              />
              <TextField
                className="flex-grow mr-xs my-0"
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                name="confirmPassword"
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange}
              />
              <IconButton onClick={this.toggleShowPassword} aria-label="show password">
                {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
            <div class="flex align-center">
              <span className="divider flex-grow"></span>
              <h2 className="divider-text">OR</h2>
              <span className="divider flex-grow"></span>
            </div>
            <div className="flex mb-4">
              <TextField
                className="flex-grow mr-m"
                label="Mobile"
                margin="normal"
                variant="outlined"
                name="mobile"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                  endAdornment:
                    <InputAdornment position="end">
                      <Button className="btn-send-otp" onClick={this.sendOtp} color="primary">
                        SEND OTP
                    </Button>
                    </InputAdornment>
                }}
              />
              <TextField
                className="input-otp"
                label="OTP"
                margin="normal"
                variant="outlined"
                name="otp"
              />
            </div>
            <div className="flex space-between">
              <Link to="/signin" className="btn-signin" style={{ textDecoration: 'none' }}>
                <Button color="primary">SIGN IN</Button>
              </Link>
              <Button onClick={this.signUp} variant="contained" color="primary">
                REGISTER
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  };

  handleChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    });
  };

  signUp = async () => {
    const profile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    const response = await AuthService.register(profile);

    if (response.status === 200) {
      this.props.setUser({ isAuthenticated: true, profile })
      this.props.history.replace('/')
    }
  };

  toggleShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword })
  }
}

export default withRouter(SignUpPage);
