import { Route, Switch } from "react-router-dom";
import BooklistContainer from "./BookList/BooklistContainer.js";
import BookDetailContainer from "./BookDetail/BookDetailContainer.js";
import Menu from "./Menu/Menu.js";

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/" component={BooklistContainer} />
        <Route path="/books/:id" component={BookDetailContainer} />
      </Switch>
    </>
  );
}

export default App;
