import { OPEN_REGISTER } from "./types";
import { CLOSE_REGISTER } from "./types";

// change the isOpenReg state variable of register modal
export const openModal = () => {
  return {
    type: OPEN_REGISTER
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_REGISTER
  };
};
