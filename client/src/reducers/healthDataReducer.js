import {
  GET_HEALTHDATA,
  ADD_HEALTHDATA,
  EDIT_HEALTHDATA,
  HEALTHDATA_LOADING,
  GETHEALTHDATA_FAIL
} from "../actions/types";

const initialState = {
  healthData: "",
  loading: false,
  sex: "",
  age: "",
  height: "",
  weight: "",
  goal: "",
  activityLevel: "",
  healthDataExists: false,
  newHealthDataAdded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HEALTHDATA:
      return {
        ...state,
        healthData: action.payload,
        loading: false,
        healthDataExists: true
      };

    case ADD_HEALTHDATA:
      return {
        ...state,
        healthData: action.payload, //for first time data

        newHealthDataAdded: true,
        username: action.payload.username,
        sex: action.payload.sex,
        age: action.payload.age,
        weight: action.payload.weight,
        height: action.payload.height,
        goal: action.payload.goal,
        activityLevel: action.payload.activityLevel
      };
    case EDIT_HEALTHDATA:
      return {
        ...state,
        healthData: action.payload, //for first time data
        loading: false,
        healthDataExists: true
      };
    case HEALTHDATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GETHEALTHDATA_FAIL:
      return {
        ...state,
        healthData: {},
        loading: false,
        healthDataExists: false
      };

    default:
      return state;
  }
}
