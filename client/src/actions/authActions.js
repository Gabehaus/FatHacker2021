import axios from "axios";
import store from "../store";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
//import { push } from "connected-react-router";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Setup config/headers and token
export const tokenConfig = getState => {
  //Get token from localstorage
  const token = localStorage.getItem("token"); // in old version used:
  //const token = store.getState().auth.token;
  console.log("token gotten by tokenConfig:", token);
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Register User
export const register = ({
  name,
  email,
  password,
  confirm_password
}) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body
  const body = JSON.stringify({ name, email, password, confirm_password });

  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    })

    .catch(err => {
      if (err.response.data.details) {
        dispatch(
          returnErrors(
            err.response.data.details[0].message,
            null,
            "REGISTER_FAIL"
          )
        );
        dispatch({ type: REGISTER_FAIL, payload: "Registration failed" });
      } else {
        dispatch(returnErrors(err.response.data.error, null, "REGISTER_FAIL"));
        dispatch({ type: REGISTER_FAIL, payload: "Registration failed" });
      }
    });
};

// Login User
export const login = data => dispatch => {
  axios
    .post("/api/auth", data)
    .then(res => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    })
    .catch(err => {});
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const oauthGoogle = data => {
  return async dispatch => {
    axios
      .post("/api/auth/oauth/google", { access_token: data })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token
        });
      })

      .catch(err => {});
  };
};

export const oauthFacebook = data => {
  return async dispatch => {
    axios
      .post("/api/auth/oauth/facebook", { access_token: data })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token
        });
        //localStorage.setItem("JWT_TOKEN", res.data.token);
      })

      .catch(err => {});
  };
};
