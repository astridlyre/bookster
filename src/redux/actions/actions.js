import axios from "axios";
import * as types from "../types.js";
import config from "../../config.js";

export function fetchBooks() {
  return async (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOKS_PENDING });
    const { term } = getState();
    try {
      const { data } = await axios.get(
        `${config.endpoint}/books${term ? `?q=${term}` : ""}`
      );
      dispatch({ type: types.FETCH_BOOKS_SUCCESS, books: data });
    } catch (error) {
      dispatch({ type: types.FETCH_BOOKS_FAILED, error: error.message });
    }
  };
}

export function setSearchTerm(term) {
  return async dispatch => {
    dispatch({
      type: types.SET_SEARCH_TERM,
      term,
    });
  };
}

export function fetchABook(id) {
  return async dispatch => {
    dispatch({ type: types.FETCH_CURRENT_BOOK_PENDING });
    try {
      const { data } = await axios.get(`${config.endpoint}/books/${id}`);
      dispatch({ type: types.FETCH_CURRENT_BOOK_SUCCESS, book: data });
    } catch (error) {
      dispatch({ type: types.FETCH_CURRENT_BOOK_FAILED, error: error.message });
    }
  };
}

export function postReview(bookId, review) {
  return async dispatch => {};
}
