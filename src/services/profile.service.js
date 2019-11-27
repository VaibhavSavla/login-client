const axios = require("axios");

const ProfileService = {
  profile: () => {
    return axios.get("/apis/v1/profile");
  }
};

export default ProfileService;
