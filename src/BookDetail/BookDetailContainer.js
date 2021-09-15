import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentBookSelector } from "../redux/selector.js";
import { fetchABook } from "../redux/actions/actions.js";
import BookDetail from "./BookDetail.js";

export default function BookDetailContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { book, loading, error } = useSelector(currentBookSelector);

  useEffect(() => {
    dispatch(fetchABook(id));
  }, [dispatch, id]);

  return <BookDetail book={book} loading={loading} error={error} />;
}
