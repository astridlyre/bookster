import axios from "axios";
import * as actions from "./redux/actions/actions.js";
import { testBooks } from "./testHelpers.js";
import store from "./store.js";

describe("Store", () => {
  const books = testBooks.slice(0, 1);

  it("Fetches books from remote", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: { books } }));
    return store.dispatch(actions.fetchBooks()).then(() => {
      const state = store.getState();
      expect(state.books.list.length).toEqual(1);
      expect(state.books.list).toEqual(books);
    });
  });

  it("Fetches current book from remote", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: { book: books[0] } }));
    return store.dispatch(actions.fetchABook()).then(() => {
      const state = store.getState();
      expect(state.currentBook.book).toEqual(books[0]);
    });
  });
});
