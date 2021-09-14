import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/actions.js";
import { bookListSelector, searchTermSelector } from "../redux/selector.js";
import { useDebounce } from "../hooks/hooks.js";
import Booklist from "./Booklist.js";

export default function BooklistContainer() {
  const dispatch = useDispatch();
  const term = useSelector(searchTermSelector);

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

  const { books, loading, error } = useSelector(bookListSelector);

  return (
    <Booklist books={books} loading={term.searching || loading} error={error} />
  );
}
