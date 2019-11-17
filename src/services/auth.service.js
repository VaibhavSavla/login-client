const axios = require("axios");

const AuthService = {
  register: reqData => {
    return axios.post("/apis/auth/register", reqData);
  },
  login: reqData => {
    return axios.post("/apis/auth/login", reqData);
  },
  logout: () => {
    return axios.get("/apis/auth/logout");
  },
  profile: () => {
    return axios.get("/apis/auth/profile");
  }
};

export default AuthService;
