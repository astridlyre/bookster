import * as types from "../types.js";
import errorsReducer from "./errors.js";

describe("Error handling", () => {
  it("Injects error message into global context", () => {
    const initState = {};
    const action = {
      type: types.FETCH_BOOKS_FAILED,
      payload: { message: "404 - Not found" },
    };
    const state = errorsReducer(initState, action);
    expect(state[types.FETCH_BOOKS].errorMessage).toEqual("404 - Not found");
  });

  it("Clears up error message when request is sent", () => {
    const initState = {
      [types.FETCH_BOOKS]: { errorMessage: "404 - Not found" },
    };
    const action = {
      type: types.FETCH_BOOKS_PENDING,
      payload: { message: "404 - Not found" },
    };
    const state = errorsReducer(initState, action);
    expect(state[types.FETCH_BOOKS].errorMessage).toEqual("");
  });

  it("Passes through when it is not a request", () => {
    const initState = {};
    const action = { type: "REALLY_SIMPLE_ACTION" };
    const state = errorsReducer(initState, action);
    expect(state).toEqual(initState);
  });

  it("Passes through when request does not have a payload", () => {
    const initState = {};
    const action = { type: "FETCH_SOMETHING_PENDING" };
    const state = errorsReducer(initState, action);
    expect(state).toEqual(initState);
  });
});
