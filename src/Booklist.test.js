import { render } from "@testing-library/react";
import Booklist from "./Booklist.js";

describe("Booklist", () => {
  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = render(<Booklist {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toContain("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = render(<Booklist {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toContain("Error");
  });

  it("renders books", () => {
    const props = {
      books: [
        { title: "Refactoring", id: 1 },
        { title: "Domain-driven design", id: 2 },
      ],
    };
    const { container } = render(<Booklist {...props} />);
    const titles = [...container.querySelectorAll("h2")].map(x => x.innerHTML);
    expect(titles).toEqual(props.books.map(book => book.title));
  });
});
