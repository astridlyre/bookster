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
    const content = container.querySelector("h2.book-title");
    expect(content.innerHTML).toEqual(props.book.title);
  });
});
