import { useState } from "react";
import { useService } from "./hooks/hooks.js";
import BookDetail from "./BookDetail.js";

export default function BookDetailContainer({ match }) {
  const [id] = useState(match.params.id);
  const [book] = useService(`books/${id}`);

  return (
    <BookDetail book={book.data} loading={book.loading} error={book.error} />
  );
}
