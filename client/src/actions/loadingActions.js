import { LOADING_START } from "./types";
import { LOADING_FINISH } from "./types";

// change the isOpenReg state variable of register modal
export const startLoading = () => {
  return {
    type: LOADING_START
  };
};

export const finishLoading = () => {
  return {
    type: LOADING_FINISH
  };
};
