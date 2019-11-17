import React from "react";
import AuthService from "../services/auth.service";

class HomePage extends React.Component {
  state = {};

  render = () => {
    return this.state && this.state.email ? (
      <>
        <h1>{this.state.firstName}</h1>
        <h1>{this.state.lastName}</h1>
        <h1>{this.state.email}</h1>
      </>
    ) : (
      <h1>Fetching Data...</h1>
    );
  };

  componentDidMount = async () => {
    const response = await AuthService.profile();
    this.setState(response.data);
  };
}

export default HomePage;
