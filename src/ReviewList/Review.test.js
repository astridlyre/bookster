import { render } from "@testing-library/react";
import Review from "./Review.js";

describe("Review", () => {
  it("renders", () => {
    const props = {
      review: {
        name: "Erin Burton",
        content: "This is awesome!",
        bookId: 1,
        createdAt: new Date().toISOString(),
      },
    };
    const { container } = render(<Review {...props} />);
    const name = container.querySelector('[data-test="review-name"]');
    const content = container.querySelector('[data-test="review-content"]');
    expect(name.innerHTML).toEqual(props.review.name);
    expect(content.innerHTML).toEqual(props.review.content);
  });
});
