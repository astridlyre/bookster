import { render } from "@testing-library/react";
import BookDetail from "./BookDetail.js";

describe("BookDetail", () => {
  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = render(<BookDetail {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toEqual("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = render(<BookDetail {...props} />);
    const content = container.querySelector("p");
    expect(content.innerHTML).toEqual("Error");
  });

  it("renders title", () => {
    const props = {
      book: {
        title: "Refactoring",
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const content = container.querySelector("h1.book-title");
    expect(content.innerHTML).toEqual(props.book.title);
  });

  it("renders description", () => {
    const props = {
      book: {
        title: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques " +
          "that hundreds of thousands of developers have used to improve " +
          "their software",
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("displays book name when no description is given", () => {
    const props = {
      book: {
        title: "Refactoring",
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.title);
  });

  it("shows *more* link when description is too long", () => {
    const props = {
      book: {
        name: "Refactoring",
        description:
          "The book about how to do refactoring with a very long title that has a lot of characters, so if you want to read it you have to click view more, otherwise it will be hidden, isn't that great? The book about how to do refactoring with a very long title that has a lot of characters, so if you want to ...",
        id: 1,
      },
    };
    const { container } = render(<BookDetail {...props} />);
    const link = container.querySelector(".show-more");
    const description = container.querySelector(".book-description");
    expect(link.innerHTML).toEqual("Show more");
    expect(description.innerHTML).toEqual(props.book.description);
  });
});
