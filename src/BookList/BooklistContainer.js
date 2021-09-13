import Booklist from "./Booklist.js";

export default function BooklistContainer({ books }) {
  return (
    <Booklist books={books.data} loading={books.loading} error={books.error} />
  );
}
