import * as types from "../types.js";

const initialState = "";

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return action.payload;
    default:
      return state;
  }
}
