import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import booksReducer from "./redux/reducers/books.js";
import currentBookReducer from "./redux/reducers/currentBook.js";
import currentUserReducer from "./redux/reducers/currentUser.js";
import searchReducer from "./redux/reducers/search.js";
import errorsReducer from "./redux/reducers/errors.js";

const middlewares = [thunk];
const composedEnhancers = compose(applyMiddleware(...middlewares));
const reducers = combineReducers({
  term: searchReducer,
  books: booksReducer,
  currentBook: currentBookReducer,
  currentUser: currentUserReducer,
  errors: errorsReducer,
});
const store = createStore(reducers, composedEnhancers);

export default store;
