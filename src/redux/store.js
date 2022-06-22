import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import rootReducer from "./reducers";
import Cookies from "js-cookie";
import { clearAuhenticate } from "./action-creators";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: "json",
  crossDomain: true,
  // withCredentials: true,
});

const apiClientsOptions = {
  interceptors: {
    request: [
      (res, req) => {
        let token = Cookies.get("token");
        req.headers["Authorization"] = `Bearer ${token}`;

        return req;
      },
    ],
    response: [
      {
        error: ({ dispatch }, error) => {
          if (error.response && 401 === error.response.status) {
            dispatch(clearAuhenticate());
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client, apiClientsOptions)));

export default store;
