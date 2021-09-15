import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { findByDataTest } from "../testHelpers.js";
import SizeLimitedText from "./SizeLimitedText.js";

describe("SizeLimitedText", () => {
  it("renders", () => {
    const props = {
      size: Infinity,
      text:
        "Hello, this is a test of the emergency response system. " +
        "If this was a real emergency, you would likely already be dead.",
    };
    const { container } = render(<SizeLimitedText {...props} />);
    const text = findByDataTest(container, "size-limited-text");
    expect(text.textContent).toEqual(props.text);
  });

  it("renders show more if length of text is greater than size", () => {
    const props = {
      size: 80,
      text:
        "Hello, this is a test of the emergency response system. " +
        "If this was a real emergency, you would likely already be dead.",
    };
    const expectedText =
      "Hello, this is a test of the emergency response system. " +
      "If this was a real emerg... Show more";
    const { container } = render(<SizeLimitedText {...props} />);
    const text = findByDataTest(container, "size-limited-text");
    expect(text.textContent).toEqual(expectedText);
  });

  it("shows full text if show more is clicked", () => {
    const props = {
      size: 80,
      text:
        "Hello, this is a test of the emergency response system. " +
        "If this was a real emergency, you would likely already be dead.",
    };
    const expectedText =
      "Hello, this is a test of the emergency response system. " +
      "If this was a real emerg... Show more";
    const { container } = render(<SizeLimitedText {...props} />);
    const text = findByDataTest(container, "size-limited-text");
    expect(text.textContent).toEqual(expectedText);
    const showMore = findByDataTest(container, "show-more");
    userEvent.click(showMore);
    expect(text.textContent).toEqual(props.text + " Show less");
  });
});
