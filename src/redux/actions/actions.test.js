import axios from "axios";
import * as actions from "./actions.js";
import * as types from "../types.js";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { testBooks, testReviews } from "../../testHelpers.js";
import config from "../../config.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BookListContainer related actions", () => {
  it("Sets the search keyword", () => {
    const term = { value: "" };
    const expected = [
      {
        type: types.SET_SEARCH_TERM,
        term,
      },
    ];
    const store = mockStore({ books: { list: [] }, term: { value: "hello" } });
    return store.dispatch(actions.setSearchTerm(term)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("Fetches data successfully", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ data: { books: testBooks } })
      );
    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books: testBooks },
    ];
    const store = mockStore({ books: { list: [] }, term: { value: "" } });
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
    const store = mockStore({ books: { list: [] }, term: { value: "" } });
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
      .mockImplementation(() =>
        Promise.resolve({ data: { books: testBooks } })
      );
    const store = mockStore({ books: { list: [] }, term: { value: "" } });
    store
      .dispatch(actions.setSearchTerm("driven"))
      .then(() => {
        store.dispatch(actions.fetchBooks()).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      })
      .catch((error) => console.error(error));
  });

  it("Fetches book", () => {
    const expectedActions = [
      { type: types.FETCH_CURRENT_BOOK_PENDING },
      { type: types.FETCH_CURRENT_BOOK_SUCCESS, book: testBooks[0] },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ data: { book: testBooks[0] } })
      );
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

  it("Saves a review for a book", () => {
    const review = testReviews[0];
    axios.post = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: { review } }));
    const store = mockStore({ books: { list: [] }, term: { value: "" } });
    return store.dispatch(actions.postReview(review)).then(() => {
      const actions = store.getActions();
      expect(axios.post).toHaveBeenCalledWith(
        `${config.endpoint}/reviews/create`,
        review,
      );
      expect(actions).toEqual([
        { type: types.POST_BOOK_REVIEW_PENDING },
        { type: types.POST_BOOK_REVIEW_SUCCESS, review },
      ]);
    });
  });

  it("logs in a user", () => {
    const credentials = {
      username: "juntao",
      password: "123456",
    };
    axios.post = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ data: { user: credentials }, token: "hello" })
      );
    const store = mockStore({ currentUser: {} });
    return store.dispatch(actions.loginUser(credentials)).then(() => {
      const actions = store.getActions();
      expect(axios.post).toHaveBeenCalledWith(
        `${config.endpoint}/users/login`,
        credentials,
      );
      expect(actions).toEqual([
        { type: types.LOGIN_SUCCESS, user: credentials },
      ]);
    });
  });

  it("handles login error", () => {
    const credentials = {
      username: "juntao",
      password: "123456",
    };
    axios.post = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ error: { message: "Something went wrong" } })
      );
    const store = mockStore({ currentUser: {} });
    return store.dispatch(actions.loginUser(credentials)).then(() => {
      const actions = store.getActions();
      expect(axios.post).toHaveBeenCalledWith(
        `${config.endpoint}/users/login`,
        credentials,
      );
      expect(actions).toEqual([{ type: types.LOGIN_FAILED }]);
    });
  });

  it("registers a user", () => {
    const credentials = {
      username: "harvey",
      email: "harvey@email.com",
      password: "123456",
      confirmPassword: "123456",
    };
    axios.post = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ data: { user: credentials, token: "hello" } })
      );
    const store = mockStore({ currentUser: {} });
    return store.dispatch(actions.registerUser(credentials)).then(() => {
      const actions = store.getActions();
      expect(axios.post).toHaveBeenCalledWith(
        `${config.endpoint}/users/register`,
        credentials,
      );
      expect(actions).toEqual([
        { type: types.REGISTER_USER_SUCCESS, user: credentials },
      ]);
    });
  });

  it("handles register error", () => {
    const credentials = {
      username: "harvey",
      email: "harvey@email.com",
      password: "123456",
      confirmPassword: "123456",
    };
    axios.post = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ error: { message: "Something went wrong" } })
      );
    const store = mockStore({ currentUser: {} });
    return store.dispatch(actions.registerUser(credentials)).then(() => {
      const actions = store.getActions();
      expect(axios.post).toHaveBeenCalledWith(
        `${config.endpoint}/users/register`,
        credentials,
      );
      expect(actions).toEqual([
        { type: types.REGISTER_USER_FAILED },
      ]);
    });
  });
});
