import { renderWithRouterAndProvider, testBooks } from "../testHelpers.js";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Booklist from "./Booklist.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Booklist", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      books: {
        list: testBooks,
      },
    });
  });

  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = renderWithRouterAndProvider(
      <Booklist {...props} />,
      store
    );
    const content = container.querySelector('[data-test="loading-message"]');
    expect(content.innerHTML).toContain("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = renderWithRouterAndProvider(
      <Booklist {...props} />,
      store
    );
    const content = container.querySelector('[data-test="error-message"]');
    expect(content.innerHTML).toContain("an Error has occured");
  });

  it("renders books", () => {
    const props = {
      books: testBooks,
    };
    const { container } = renderWithRouterAndProvider(
      <Booklist {...props} />,
      store
    );
    const titles = [...container.querySelectorAll("h2")].map(x => x.innerHTML);
    expect(titles).toEqual(props.books.map(book => book.title));
  });

  it("shows *more* link when description is too long", () => {
    const props = {
      books: [testBooks[0]],
    };
    const { container } = renderWithRouterAndProvider(
      <Booklist {...props} />,
      store
    );
    const link = container.querySelector(".show-more");
    const description = container.querySelector(".book-description");
    expect(link.innerHTML).toEqual("(more)");
    expect(description.textContent).toEqual(props.books[0].description);
  });
});
