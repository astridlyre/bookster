import { Route, Switch, Redirect } from "react-router-dom";
import BooklistContainer from "./BookList/BooklistContainer.js";
import BookDetailContainer from "./BookDetail/BookDetailContainer.js";
import Menu from "./Menu/Menu.js";
import Bar from "./LoginFlow/Bar.js";
import LoginContainer from "./LoginFlow/LoginContainer.js";
import { useSelector } from "react-redux";
import { currentUserSelector } from "./redux/selector.js";

function App() {
  const currentUser = useSelector(currentUserSelector);
  return (
    <>
      {currentUser.loggedIn ? <Menu /> : <Bar />}
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/">
          {currentUser.loggedIn ? (
            <BooklistContainer />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/books/:id" component={BookDetailContainer}>
          {currentUser.loggedIn ? (
            <BookDetailContainer />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
