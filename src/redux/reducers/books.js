import * as types from "../types.js";

const initialState = [];

export default function booksReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_BOOKS_SUCCESS:
      return [...payload];
    default:
      return state;
  }
}
