const axios = require("axios");

const AuthService = {
  register: reqData => {
    return axios.post("/apis/v1/auth/register", reqData);
  },
  login: reqData => {
    return axios.post("/apis/v1/auth/login", reqData);
  },
  logout: () => {
    return axios.get("/apis/v1/auth/logout");
  },
  profile: () => {
    return axios.get("/apis/v1/auth/profile");
  }
};

export default AuthService;
