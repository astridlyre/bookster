import currentBookReducer from "./currentBook.js";
import * as types from "../types.js";

describe("Current Book Reducer", () => {
  it("Adds review to state when request is successful", () => {
    const currentBook = {
      reviews: [],
    };
    const review = {
      name: "John",
      content: "Testing",
    };
    const action = { type: types.POST_BOOK_REVIEW_SUCCESS, payload: review };
    const state = currentBookReducer(currentBook, action);
    expect(state.reviews).toContain(review);
  });

  it("Updates book review", () => {
    const currentBook = {
      reviews: [{ id: 1, name: "John", content: "This is my review" }],
    };
    const updatedReview = {
      id: 1,
      name: "John",
      content: "This is my updated review",
    };
    const action = {
      type: types.UPDATE_BOOK_REVIEW_SUCCESS,
      payload: updatedReview,
    };
    const state = currentBookReducer(currentBook, action);
    expect(state.reviews).toContain(updatedReview);
    expect(state.reviews).not.toContain(currentBook.reviews[0]);
  });
});
