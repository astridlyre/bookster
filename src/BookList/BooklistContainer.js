import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/actions.js";
import {
  bookListSelector,
  searchTermSelector,
  booksListStatusSelector,
} from "../redux/selector.js";
import { useDebounce } from "../hooks/hooks.js";
import Booklist from "./Booklist.js";

export default function BooklistContainer() {
  const dispatch = useDispatch();
  const term = useSelector(searchTermSelector);
  const booksListStatus = useSelector(booksListStatusSelector);

  useDebounce(
    () => {
      dispatch(fetchBooks());
    },
    250,
    [term, dispatch]
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const books = useSelector(bookListSelector);

  return (
    <Booklist
      books={books}
      loading={booksListStatus.loading}
      error={booksListStatus.error}
    />
  );
}
