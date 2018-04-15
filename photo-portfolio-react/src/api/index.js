import axios from "axios";

export default {
  user: {
    login: credentials =>
      // 'then(res => res.data.user)' just resolves the promise to the needed 'user'
      axios
        .post("/auth/login", credentials)
        .then(res => res.data.user)
  }
};
