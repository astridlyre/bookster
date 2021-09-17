import * as types from "../types.js";

const initialState = {
  loggedIn: false,
};

export default function currentUserReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...payload, loggedIn: true };
    case types.REGISTER_USER_FAILED:
    case types.LOGIN_FAILED:
    case types.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
