import * as types from "../types.js";

const initialState = {
  reviews: [],
};

export default function currentBookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_CURRENT_BOOK_SUCCESS:
      return action.payload;
    case types.POST_BOOK_REVIEW_SUCCESS:
      return { ...state, reviews: state.reviews.concat(payload) };
    case types.UPDATE_BOOK_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.map(r => (r.id === payload.id ? payload : r)),
      };
    default:
      return state;
  }
}
