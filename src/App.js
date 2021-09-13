import { useState, useEffect } from "react";
import { useService } from "./hooks/hooks.js";
import { Route, Switch } from "react-router-dom";
import BooklistContainer from "./BookList/BooklistContainer.js";
import BookDetailContainer from "./BookDetail/BookDetailContainer.js";
import Menu from "./Menu/Menu.js";

function App() {
  const [books, setUrl] = useService("books");
  const [term, setTerm] = useState("");

  useEffect(() => {
    setUrl(`books?q=${term}`);
  }, [term, setUrl]);

  return (
    <>
      <Menu term={term} setTerm={setTerm} />
      <Switch>
        <Route exact path="/">
          <BooklistContainer books={books} />
        </Route>
        <Route path="/books/:id" component={BookDetailContainer} />
      </Switch>
    </>
  );
}

export default App;
