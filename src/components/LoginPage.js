import './LoginPage.css'
import React from "react";
import { withRouter, Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import AuthService from "../services/auth.service";

class LoginPage extends React.Component {
  state = { method: 'email', invalid: {} };

  formGroupName = () => {
    return (
      <>
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
      </>
    )
  }
  render = () => {
    return (
      <>
        <form className="mt-4" autoComplete="off">
          <div className="container">
            {this.props.mode === 'signup' ? this.formGroupName() : <></>}
            <Typography variant="h5" className="mb-0 mt-2">{this.props.mode === 'signup' ? 'Register' : 'Login'} With</Typography>
            <TextField
              error={this.state.invalid['email']}
              className="width-1-1"
              label="Email"
              helperText={this.state.invalid['email'] ? 'Invalid Email' : ''}
              margin="normal"
              variant="outlined"
              name="email"
              onBlur={this.validateEmail}
              onChange={this.handleChange}
            />
            <div className="flex align-center password-container">
              <TextField
                error={this.state.invalid['password']}
                className="flex-grow mr-m my-0 text-password"
                label="Password"
                margin="normal"
                variant="outlined"
                name="password"
                helperText={this.state.invalid['password'] ? 'Password has to be atleast 6 characters' : ''}
                onBlur={this.validatePassword}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange}
              />
              {this.props.mode === 'signup' ?
                < TextField
                  error={this.state.invalid['confirmPassword']}
                  className="flex-grow mr-xs my-0"
                  label="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  name="confirmPassword"
                  type={this.state.showPassword ? 'text' : 'password'}
                  helperText={this.state.invalid['confirmPassword'] ? 'Password does not match' : ''}
                  onBlur={this.validateConfirmPassword}
                  onChange={this.handleChange}
                /> : <></>}
              <IconButton onClick={this.toggleShowPassword} aria-label="show password">
                {this.state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
            <div className="flex align-center">
              <span className="divider flex-grow"></span>
              <Typography variant="h5" className="divider-text">OR</Typography>
              <span className="divider flex-grow"></span>
            </div>
            <div className="flex mb-4">
              <TextField
                type="tel"
                className="flex-grow mr-m"
                label="Mobile"
                margin="normal"
                variant="outlined"
                name="mobile"
                onBlur={this.validateMobile}
                error={this.state.invalid['mobile']}
                onChange={this.handleChange}
                helperText={this.state.invalid['mobile'] ? 'Invalid Mobile number' : ''}
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
                type="number"
                className="input-otp"
                label="OTP"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                name="otp"
              />
            </div>
            <div className="flex space-between">
              <Link to={this.props.mode === 'signin' ? '/signup' : '/signin'} className="btn-signin" style={{ textDecoration: 'none' }}>
                <Button color="primary">{this.props.mode === 'signup' ? 'Sign In instead' : 'Create Account'}</Button>
              </Link>
              {
                this.props.mode === 'signup' ?
                  <Button onClick={this.signUp} variant="contained" color="primary">REGISTER</Button> :
                  <Button onClick={this.signIn} variant="contained" color="primary">SIGN IN</Button>
              }
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

  validateEmail = ({ target }) => {
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(target.value)
    this.setState({
      ...this.state,
      invalid: {
        ...this.state.valid,
        email: !isValid
      }
    })

    return isValid
  }

  validateMobile = ({ target }) => {
    const isNumber = !isNaN(target.value)
    const isValidLength = (target.value || '').length === 10
    this.setState({
      ...this.state,
      invalid: {
        ...this.state.invalid,
        mobile: !isNumber || !isValidLength
      }
    })
    return isNumber & isValidLength
  }

  validatePassword = ({ target }) => {
    const passwordLen = (target.value || '').length
    this.setState({
      ...this.state,
      invalid: {
        ...this.state.invalid,
        password: passwordLen < 6
      }
    })
    return passwordLen >= 6
  }

  validateConfirmPassword = ({ target }) => {
    const confirmPassword = target.value
    const password = this.state['password']
    this.setState({
      ...this.state,
      invalid: {
        ...this.state.invalid,
        confirmPassword: password !== confirmPassword
      }
    })

    return password === confirmPassword
  }

  validateForm = () => {
    if (this.state.method === 'otp') {
      return this.validateMobile({ target: { value: this.state['mobile'] } })
    }
    return this.validateEmail({ target: { value: this.state['email'] } }) &&
      this.validatePassword({ target: { value: this.state['password'] } }) &&
      this.validateConfirmPassword({ target: { value: this.state['confirmPassword'] } })
  }

  signIn = async () => {
    console.log(this.state.method)
    const credentials = {
      username: this.state.method === 'email' ? this.state.email : this.state.mobile,
      password: this.state.method === 'email' ? this.state.password : this.state.otp
    }

    const response = await AuthService.login(credentials)
    if (response.status === 200) {
      this.props.setUser({ isAuthenticated: true })
      this.props.history.replace('/')
    }
  }

  signUp = async () => {
    if (!this.validateForm()) {
      return
    }
    const profile = {
      method: this.state.method,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      otp: this.state.otp
    }
    const response = await AuthService.register(profile);

    if (response.status === 200) {
      this.props.setUser({ isAuthenticated: true, profile })
      this.props.history.replace('/')
    }
  };

  sendOtp = () => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.method = 'otp'
    if (this.validateMobile({ target: { value: this.state.mobile } })) {
      AuthService.sendOtp(this.state.mobile)
    }
  }

  toggleShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword })
  }
}

export default withRouter(LoginPage);
