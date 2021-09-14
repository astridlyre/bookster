import axios from "axios";
import * as types from "../types.js";
import config from "../../config.js";

export function fetchBooks() {
  return async (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOKS_PENDING });
    const { term } = getState();
    try {
      const { data } = await axios.get(
        `${config.endpoint}/books${term.value ? `?q=${term.value}` : ""}`
      );
      dispatch({ type: types.FETCH_BOOKS_SUCCESS, books: data.books });
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
      dispatch({ type: types.FETCH_CURRENT_BOOK_SUCCESS, book: data.book });
    } catch (error) {
      dispatch({ type: types.FETCH_CURRENT_BOOK_FAILED, error: error.message });
    }
  };
}

export function postReview(review) {
  return async dispatch => {
    dispatch({ type: types.POST_BOOK_REVIEW_PENDING });
    try {
      const { data } = await axios.post(
        `${config.endpoint}/reviews/create`,
        review
      );
      dispatch({ type: types.POST_BOOK_REVIEW_SUCCESS, review: data.review });
    } catch (error) {
      dispatch({ type: types.POST_BOOK_REVIEW_FAILED, error: error.message });
    }
  };
}
