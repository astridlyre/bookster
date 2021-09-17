import axios from "axios";
import * as types from "../types.js";
import config from "../../config.js";

const TOKEN_KEY = "BOOKLIST_APP_TOKEN";
const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_KEY);
  config.headers["x-access-token"] = token;
  return config;
});

export function loginUser(credentials) {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_PENDING });
    try {
      const { data } = await axios.post(
        `${config.endpoint}/users/login`,
        credentials,
      );
      saveToken(data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: types.LOGIN_FAILED, payload: error });
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      await axios.delete(`${config.endpoint}/users/logout`);
      clearToken();
    } catch (_) {
      // No need to handle error for logout
    } finally {
      dispatch({ type: types.LOGOUT_USER });
    }
  };
}

export function getProfile() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${config.endpoint}/users/profile`);
      if (data.user) {
        dispatch({ type: types.LOGIN_SUCCESS, payload: data.user });
      }
    } catch (_) {
      // No need to handle error for attempted auto login
    }
  };
}

export function registerUser(user) {
  return async (dispatch) => {
    dispatch({ type: types.REGISTER_USER_PENDING });
    try {
      const { data } = await axios.post(
        `${config.endpoint}/users/register`,
        user,
      );
      saveToken(data.token);
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAILED, payload: error });
    }
  };
}

export function fetchBooks() {
  return async (dispatch, getState) => {
    dispatch({ type: types.FETCH_BOOKS_PENDING });
    const { term } = getState();
    try {
      const { data } = await axios.get(
        `${config.endpoint}/books${term ? `?q=${term}` : ""}`,
      );
      dispatch({ type: types.FETCH_BOOKS_SUCCESS, payload: data.books });
    } catch (error) {
      dispatch({ type: types.FETCH_BOOKS_FAILED, payload: error });
    }
  };
}

export function setSearchTerm(term) {
  return (dispatch) =>
    Promise.resolve(dispatch({ type: types.SET_SEARCH_TERM, payload: term }));
}

export function fetchABook(id) {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_CURRENT_BOOK_PENDING });
    try {
      const { data } = await axios.get(`${config.endpoint}/books/${id}`);
      dispatch({ type: types.FETCH_CURRENT_BOOK_SUCCESS, payload: data.book });
    } catch (error) {
      dispatch({ type: types.FETCH_CURRENT_BOOK_FAILED, payload: error });
    }
  };
}

export function postReview(review) {
  return async (dispatch) => {
    dispatch({ type: types.POST_BOOK_REVIEW_PENDING });
    try {
      const { data } = await axios.post(
        `${config.endpoint}/reviews/create`,
        review,
      );
      dispatch({ type: types.POST_BOOK_REVIEW_SUCCESS, payload: data.review });
    } catch (error) {
      dispatch({ type: types.POST_BOOK_REVIEW_FAILED, payload: error });
    }
  };
}

export function updateReview(review) {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_BOOK_REVIEW_PENDING });
    try {
      const { data } = await axios.put(
        `${config.endpoint}/reviews/update/${review.id}`,
        review,
      );
      dispatch({
        type: types.UPDATE_BOOK_REVIEW_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_BOOK_REVIEW_FAILED,
        payload: error.message,
      });
    }
  };
}
