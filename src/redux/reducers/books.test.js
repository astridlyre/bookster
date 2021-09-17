import booksReducer from "./books.js";
import * as types from "../types.js";

describe("Books Reducer", () => {
  it("Adds books to state when request is successful", () => {
    const books = [
      { id: 1, title: "Refactoring" },
      { id: 2, title: "Domain-driven design" },
    ];
    const action = {
      type: types.FETCH_BOOKS_SUCCESS,
      payload: books,
    };
    const state = booksReducer([], action);
    expect(state).toEqual(books);
  });
});
