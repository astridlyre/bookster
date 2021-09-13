import axios from "axios";
import * as actions from "./actions.js";
import * as types from "../types.js";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BookListContainer related actions", () => {
  it("Sets the search keyword", () => {
    const term = "";
    const expected = [
      {
        type: types.SET_SEARCH_TERM,
        term,
      },
    ];
    const store = mockStore({ books: { list: [] }, term: "hello" });
    return store.dispatch(actions.setSearchTerm(term)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("Fetches data successfully", () => {
    const books = [
      { id: 1, title: "Refactoring" },
      { id: 2, title: "Domain-driven design" },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books },
    ];
    const store = mockStore({ books: { list: [] } });
    return store.dispatch(actions.fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetches data with error", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ message: "Something went wrong" })
      );
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, error: "Something went wrong" },
    ];
    const store = mockStore({ books: { list: [] } });
    return store.dispatch(actions.fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Searches books with term", () => {
    const books = [
      { id: 1, title: "Refactoring" },
      { id: 2, title: "Domain-driven design" },
    ];
    const expectedActions = [
      { type: types.SET_SEARCH_TERM, term: "domain" },
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));
    const store = mockStore({ books: { list: [] }, term: "" });
    store
      .dispatch(actions.setSearchTerm("domain"))
      .then(() => {
        store.dispatch(actions.fetchBooks()).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      })
      .catch(error => console.error(error));
  });

  it("Fetches book", () => {
    const book = { id: 1, title: "Refactoring" };
    const expectedActions = [
      { type: types.FETCH_CURRENT_BOOK_PENDING },
      { type: types.FETCH_CURRENT_BOOK_SUCCESS, book },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));
    const store = mockStore({ currentBook: {} });
    store.dispatch(actions.fetchABook(book.id)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it("Fetches book with error", () => {
    const book = { id: 1, title: "Refactoring" };
    const expectedActions = [
      { type: types.FETCH_CURRENT_BOOK_PENDING },
      { type: types.FETCH_CURRENT_BOOK_FAILED, error: "Something went wrong" },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ message: "Something went wrong" })
      );
    const store = mockStore({ currentBook: {} });
    store.dispatch(actions.fetchABook(book.id)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
