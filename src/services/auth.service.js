const axios = require("axios");

const AuthService = {
  register: reqData => {
    return axios.post("/apis/auth/register", reqData);
  },
  login: reqData => {
    return axios.post("/apis/auth/login", reqData);
  },
  sendOtp: mobile => {
    return axios.get(`/apis/auth/sendOtp/${mobile}`);
  },
  logout: () => {
    return axios.get("/apis/auth/logout");
  }
};

export default AuthService;
