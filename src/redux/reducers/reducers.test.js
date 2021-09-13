import { booksReducer } from "./reducers.js";
import * as types from "../types.js";

describe("Reducers", () => {
  it("Books Reducer shows loading when request is send", () => {
    const initState = { loading: false };
    const action = { type: types.FETCH_BOOKS_PENDING };
    const state = booksReducer(initState, action);
    expect(state.loading).toBeTruthy();
  });

  it("Adds books to state when request is successful", () => {
    const books = [
      { id: 1, title: "Refactoring" },
      { id: 2, title: "Domain-driven design" },
    ];
    const action = {
      type: types.FETCH_BOOKS_SUCCESS,
      books,
    };
    const state = booksReducer([], action);
    expect(state.list).toBe(books);
  });
});
