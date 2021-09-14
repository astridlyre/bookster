import { testReviews, renderWithProvider } from "../testHelpers.js";
import ReviewList from "./ReviewList.js";
import "@testing-library/jest-dom";

describe("ReviewList", () => {
  it("renders an empty list", () => {
    const props = {
      bookId: 1,
    };
    const { container } = renderWithProvider(<ReviewList {...props} />);
    const reviews = container.querySelector('[data-test="reviews-container"]');
    expect(reviews).toBeInTheDocument();
  });

  it("renders a list when data is passed", () => {
    const props = {
      reviews: testReviews,
    };
    const { container } = renderWithProvider(<ReviewList {...props} />);
    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] [data-test="review-name"]'
    );
    expect(reviews.length).toBe(2);
    expect(reviews[0].innerHTML).toEqual(testReviews[0].name);
  });
});
