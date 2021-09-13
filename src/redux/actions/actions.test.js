import axios from "axios";
import * as actions from "./actions.js";
import * as types from "../types.js";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { testBooks } from "../../testHelpers.js";

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
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: testBooks }));
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books: testBooks },
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
    const expectedActions = [
      { type: types.SET_SEARCH_TERM, term: "driven" },
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books: testBooks },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: testBooks }));
    const store = mockStore({ books: { list: [] }, term: "" });
    store
      .dispatch(actions.setSearchTerm("driven"))
      .then(() => {
        store.dispatch(actions.fetchBooks()).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      })
      .catch(error => console.error(error));
  });

  it("Fetches book", () => {
    const expectedActions = [
      { type: types.FETCH_CURRENT_BOOK_PENDING },
      { type: types.FETCH_CURRENT_BOOK_SUCCESS, book: testBooks[0] },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: testBooks[0] }));
    const store = mockStore({ currentBook: {} });
    store.dispatch(actions.fetchABook(testBooks[0].id)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  it("Fetches book with error", () => {
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
    store.dispatch(actions.fetchABook(testBooks[0].id)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
