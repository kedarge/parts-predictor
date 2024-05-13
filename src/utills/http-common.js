// This file is temp, once move to utils service then no need of this

import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_ORIGIN,
  headers: {
    "Content-type": "application/json",
  },
});
