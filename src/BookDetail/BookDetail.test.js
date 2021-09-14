import { testReviews, testBooks, renderWithProvider } from "../testHelpers.js";
import BookDetail from "./BookDetail.js";

describe("BookDetail", () => {
  it("loading", () => {
    const props = {
      loading: true,
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const content = container.querySelector('[data-test="loading-message"]');
    expect(content.innerHTML).toEqual("Loading");
  });

  it("error", () => {
    const props = {
      error: true,
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const content = container.querySelector('[data-test="error-message"]');
    expect(content.innerHTML).toEqual("an Error has occured");
  });

  it("renders title", () => {
    const props = {
      book: testBooks[0],
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
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
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("displays book name when no description is given", () => {
    const props = {
      book: {
        title: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
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
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const link = container.querySelector(".show-more");
    const description = container.querySelector(".book-description");
    expect(link.innerHTML).toEqual("Show more");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("renders reviews", () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "Test description",
        id: 1,
        reviews: testReviews,
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] [data-test="review-name"]'
    );
    expect(reviews.length).toBe(2);
    expect(reviews[0].innerHTML).toEqual("Juntao");
  });
});
