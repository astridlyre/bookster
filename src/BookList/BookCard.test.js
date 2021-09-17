import { renderWithRouterAndProvider, testBooks } from "../testHelpers.js";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import BookCard from "./BookCard.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BookCard", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      books: testBooks
    });
  });

  it("should render title", () => {
    const props = {
      bookId: 1,
    };
    const { container } = renderWithRouterAndProvider(
      <BookCard {...props} />,
      store
    );
    const title = container.querySelector("h2");
    expect(title.innerHTML).toEqual("Refactoring");
  });

  it("should render description", () => {
    const props = {
      bookId: 3,
    };
    const { container } = renderWithRouterAndProvider(
      <BookCard {...props} />,
      store
    );
    const description = container.querySelector("p");
    expect(description.innerHTML).toEqual(testBooks[1].description);
  });
});
