import { OPEN_REGISTER } from "../actions/types";

const initialState = {
  isOpenReg: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_REGISTER:
      return {
        ...state,
        isOpenReg: !state.isOpenReg
      };
    default:
      return state;
  }
}
