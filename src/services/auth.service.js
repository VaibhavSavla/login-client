const axios = require("axios");

const AuthService = {
  register: reqData => {
    return axios.post("/apis/v1/auth/register", reqData);
  },
  login: reqData => {
    return axios.post("/apis/v1/auth/login", reqData);
  },
  sendOtp: mobile => {
    return axios.get(`/apis/v1/auth/sendOtp/${mobile}`);
  },
  logout: () => {
    return axios.get("/apis/v1/auth/logout");
  }
};

export default AuthService;
