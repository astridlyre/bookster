import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  currentBookSelector,
  currentBookStatusSelector,
} from "../redux/selector.js";
import { fetchABook } from "../redux/actions/actions.js";
import BookDetail from "./BookDetail.js";

export default function BookDetailContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentBook = useSelector(currentBookSelector);
  const currentBookStatus = useSelector(currentBookStatusSelector);

  useEffect(() => {
    dispatch(fetchABook(id));
  }, [dispatch, id]);

  return (
    <BookDetail
      book={currentBook}
      loading={currentBookStatus.loading}
      error={currentBookStatus.error}
    />
  );
}
