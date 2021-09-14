import * as types from "../types.js";

export function booksReducer(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOOKS_PENDING:
      return { ...state, loading: true };
    case types.FETCH_BOOKS_SUCCESS:
      return { list: action.books };
    case types.FETCH_BOOKS_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
}

export function searchReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return { ...state, value: action.term };
    default:
      return state;
  }
}

export function currentBookReducer(state = {}, action) {
  switch (action.type) {
    case types.FETCH_CURRENT_BOOK_PENDING:
      return { ...state, loading: true };
    case types.FETCH_CURRENT_BOOK_SUCCESS:
      return { book: action.book };
    case types.FETCH_CURRENT_BOOK_FAILED:
      return { ...state, error: true };
    case types.POST_BOOK_REVIEW_SUCCESS:
      return {
        ...state,
        book: addReview(state.book, action.review),
      };
    default:
      return state;
  }
}

function addReview(book, review) {
  return {
    ...book,
    reviews: book.reviews.concat(review),
  };
}
