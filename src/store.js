import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  booksReducer,
  searchReducer,
  currentBookReducer,
} from "./redux/reducers/reducers.js";

const initialState = {
  books: {
    list: [],
  },
  currentBook: {
    book: {
      reviews: [],
    },
  },
  term: {
    value: "",
  },
};

const middlewares = [thunk];
const composedEnhancers = compose(applyMiddleware(...middlewares));
const reducers = combineReducers({
  term: searchReducer,
  books: booksReducer,
  currentBook: currentBookReducer,
});
const store = createStore(reducers, initialState, composedEnhancers);

export default store;
