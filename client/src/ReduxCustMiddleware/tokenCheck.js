import jwt_decode from "jwt-decode";
import { logout } from "../actions/authActions";

const checkTokenExpirationMiddleware = store => next => action => {
  const token = localStorage.getItem("token");
  if (token && jwt_decode(token).exp < Date.now() / 1000) {
    next(action);
    localStorage.clear();
    console.log("token middleware was fired");
    store.dispatch(logout());
  }
  next(action);
};

export default checkTokenExpirationMiddleware;
