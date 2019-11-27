const axios = require("axios");

const ProfileService = {
  profile: () => {
    return axios.get("/apis/profile");
  }
};

export default ProfileService;
