import {
  GET_HEALTHDATA,
  EDIT_HEALTHDATA,
  HEALTHDATA_LOADING,
  GETHEALTHDATA_FAIL
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getHealthData = username => (dispatch, getState) => {
  dispatch(setHealthDataLoading());
  axios
    .get(`/api/healthData/${username}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_HEALTHDATA,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GETHEALTHDATA_FAIL
      });
    });
};
export const addHealthData = healthData => (dispatch, getState) => {
  axios
    .post("/api/healthData", healthData, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_HEALTHDATA,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_FATLOG_FAIL")
      )
    );
};

export const editHealthData = (healthData, username) => (
  dispatch,
  getState
) => {
  axios
    .post(`/api/healthData/update/${username}`, healthData)
    .then(res =>
      dispatch({
        type: EDIT_HEALTHDATA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_FATLOG_FAIL")
      )
    );
};

export const setHealthDataLoading = () => {
  return {
    type: HEALTHDATA_LOADING
  };
};
