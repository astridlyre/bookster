import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from "../types.js";

const initialState = {};

export default function errors(state = initialState, action) {
  const { type, payload } = action;
  const matches = /(.*)_(PENDING|FAILED)/.exec(type);
  if (!matches || !payload) return state;
  const [, name, status] = matches;
  return {
    ...state,
    [name]: {
      status:
        status === "FAILED"
          ? STATUS_FAILED
          : status === "PENDING"
          ? STATUS_LOADING
          : STATUS_SUCCESS,
      errorMessage: status === "FAILED" ? payload.message : "",
    },
  };
}
