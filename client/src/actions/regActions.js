import { OPEN_REGISTER } from "./types";

// change the isOpenReg state variable of register modal
export const openModal = () => {
  return {
    type: OPEN_REGISTER
  };
};
