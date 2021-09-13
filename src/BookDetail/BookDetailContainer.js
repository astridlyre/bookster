import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentBookSelector } from "../redux/selector.js";
import { fetchABook } from "../redux/actions/actions.js";
import BookDetail from "./BookDetail.js";

export default function BookDetailContainer({ match }) {
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector(currentBookSelector);

  useEffect(() => {
    dispatch(fetchABook(match.params.id));
  }, [dispatch, match.params.id]);

  return <BookDetail book={book} loading={loading} error={error} />;
}
