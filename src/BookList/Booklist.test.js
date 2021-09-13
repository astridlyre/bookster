import { renderWithRouter } from "../testHelpers.js";
import Booklist from "./Booklist.js";

describe("Booklist", () => {
  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const content = container.querySelector('[data-test="loading-message"]');
    expect(content.innerHTML).toContain("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const content = container.querySelector('[data-test="error-message"]');
    expect(content.innerHTML).toContain("an Error has occured");
  });

  it("renders books", () => {
    const props = {
      books: [
        { title: "Refactoring", id: 1 },
        { title: "Domain-driven design", id: 2 },
      ],
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const titles = [...container.querySelectorAll("h2")].map(x => x.innerHTML);
    expect(titles).toEqual(props.books.map(book => book.title));
  });

  it("shows *more* link when description is too long", () => {
    const props = {
      books: [
        {
          name: "Refactoring",
          description:
            "The book about how to do refactoring with a very long title that has a lot of ch... (more)",
          id: 1,
        },
      ],
    };
    const { container } = renderWithRouter(<Booklist {...props} />);
    const link = container.querySelector(".show-more");
    const description = container.querySelector(".book-description");
    expect(link.innerHTML).toEqual("(more)");
    expect(description.textContent).toEqual(props.books[0].description);
  });
});
