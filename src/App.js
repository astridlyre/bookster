import { Route, Switch } from "react-router-dom";
import BooklistContainer from "./BookList/BooklistContainer.js";
import BookDetailContainer from "./BookDetail/BookDetailContainer.js";
import Menu from "./Menu/Menu.js";
import Bar from "./LoginFlow/Bar.js";
import LoginContainer from "./LoginFlow/LoginContainer.js";
import Profile from "./Profile/Profile.js";
import { useSelector } from "react-redux";
import { currentUserSelector } from "./redux/selector.js";

function App() {
  const currentUser = useSelector(currentUserSelector);

  if (!currentUser.loggedIn) {
    return (
      <>
        <Bar />
        <LoginContainer />
      </>
    );
  }

  return (
    <>
      <Menu />
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/" component={BooklistContainer} />
        <Route path="/books/:id" component={BookDetailContainer} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  );
}

export default App;
