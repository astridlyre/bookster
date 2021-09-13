import { renderWithRouter } from "../testHelpers.js";
import BookCard from "./BookCard.js";

describe("BookCard", () => {
  it("should render title", () => {
    const props = {
      book: {
        title: "Refactoring",
        id: 1,
        description: "Martin Fowler's refactoring...",
      },
    };
    const { container } = renderWithRouter(<BookCard {...props} />);
    const title = container.querySelector("h2");
    expect(title.innerHTML).toEqual("Refactoring");
  });

  it("should render description", () => {
    const props = {
      book: {
        title: "Building Microservices",
        id: 3,
        description: "Author Sam Newman",
      },
    };
    const { container } = renderWithRouter(<BookCard {...props} />);
    const description = container.querySelector("p");
    expect(description.innerHTML).toEqual(props.book.description);
  });
});
