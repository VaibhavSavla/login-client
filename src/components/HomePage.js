import React from "react";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Axios from "axios";

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.user && props.user.profile
  }
  render = () => {
    return this.state && this.state.email ? (
      <>
        <h1>{this.state.firstName}</h1>
        <h1>{this.state.lastName}</h1>
        <h1>{this.state.email}</h1>
        <Button onClick={this.logout} variant="contained" color="primary">Logout</Button>
      </>
    ) : (
        <h1>Fetching Data...</h1>
      );
  };

  componentDidMount = async () => {
    if (!this.state || !this.state.email) {
      const response = await AuthService.profile();
      this.setState(response.data);
    }
  };

  logout = async () => {
    const response = await AuthService.logout()
    if (response.status === 200) {
      this.props.history.replace('/signin')
    }
  }
}

export default withRouter(HomePage);
