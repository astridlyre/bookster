import axios from "axios";
import * as types from "../types.js";
import config from "../../config.js";

const TOKEN_KEY = "BOOKLIST_APP_TOKEN";
const saveToken = token => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_KEY);
  config.headers["x-access-token"] = token;
  return config;
});

export function loginUser(credentials) {
  return async dispatch => {
    try {
      const { data } = await axios.post(
        `${config.endpoint}/users/login`,
        credentials
      );
      saveToken(data.token);
      dispatch({ type: types.LOGIN_SUCCESS, user: data.user });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.LOGIN_FAILED, error: error.message });
    }
  };
}

export function logoutUser() {
  return async dispatch => {
    try {
      await axios.delete(`${config.endpoint}/users/logout`);
      clearToken();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: types.LOGOUT_USER });
    }
  };
}

export function getProfile() {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${config.endpoint}/users/profile`);
      if (data.user) {
        dispatch({ type: types.LOGIN_SUCCESS, user: data.user });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function registerUser(user) {
  return async dispatch => {
    try {
      const { data } = await axios.post(
        `${config.endpoint}/users/register`,
        user
      );
      saveToken(data.token);
      dispatch({ type: types.REGISTER_USER_SUCCESS, user: data.user });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.REGISTER_USER_FAILED, error: error.message });
    }
  };
}

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
