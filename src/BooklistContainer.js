import { useService } from "./hooks/hooks.js";
import Booklist from "./Booklist.js";

export default function BooklistContainer() {
  const [books] = useService("books");
  return (
    <Booklist books={books.data} loading={books.loading} error={books.error} />
  );
}
