import * as types from "./types.js";

function getStatus(status) {
  return {
    loading: status === types.STATUS_LOADING,
    error: status === types.STATUS_FAILED,
  };
}

export const bookListSelector = state => state.books;
export const currentBookSelector = state => state.currentBook;
export const searchTermSelector = state => state.term;
export const currentUserSelector = state => state.currentUser;
export const withBookSelector = id => state =>
  state.books.find(book => book.id === id) || {};
export const booksListStatusSelector = state =>
  getStatus(state.errors[types.FETCH_BOOKS]?.status);
export const currentBookStatusSelector = state =>
  getStatus(state.errors[types.FETCH_CURRENT_BOOK]?.status);
export const loginStatusSelector = state =>
  getStatus(state.errors[types.LOGIN]?.status);
export const registerStatusSelector = state =>
  getStatus(state.errors[types.REGISTER]?.status);
