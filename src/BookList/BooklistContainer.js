import { useState, useEffect } from "react";
import { useService } from "../hooks/hooks.js";
import Booklist from "./Booklist.js";
import SearchBox from "../SearchBox/SearchBox.js";

export default function BooklistContainer() {
  const [books, setUrl] = useService("books");
  const [term, setTerm] = useState("");

  useEffect(() => {
    setUrl(`books?q=${term}`);
  }, [term, setUrl]);

  return (
    <>
      <SearchBox term={term} onSearch={e => setTerm(e.target.value)} />
      <Booklist
        books={books.data}
        loading={books.loading}
        error={books.error}
      />
    </>
  );
}
