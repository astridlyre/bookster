import { createSelector } from "reselect";

export const bookListSelector = createSelector(
  [
    state => state.books.list,
    state => state.books.loading,
    state => state.books.error,
  ],
  (books, loading, error) => ({ books, loading, error })
);

export const currentBookSelector = createSelector(
  [
    state => state.currentBook.book,
    state => state.currentBook.loading,
    state => state.currentBook.error,
  ],
  (book, loading, error) => ({ book, loading, error })
);