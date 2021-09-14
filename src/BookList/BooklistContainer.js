import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions/actions.js";
import { bookListSelector, searchTermSelector } from "../redux/selector.js";
import Booklist from "./Booklist.js";

export default function BooklistContainer() {
  const dispatch = useDispatch();
  const term = useSelector(searchTermSelector);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [term, dispatch]);

  const { books, loading, error } = useSelector(bookListSelector);

  return <Booklist books={books} loading={loading} error={error} />;
}
