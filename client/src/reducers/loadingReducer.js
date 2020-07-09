import { LOADING_START } from "../actions/types";
import { LOADING_FINISH } from "../actions/types";

const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true
      };
    case LOADING_FINISH:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
