import { renderWithRouterAndProvider } from "../testHelpers.js";
import userEvent from "@testing-library/user-event";
import Menu from "./Menu.js";

describe("Menu", () => {
  it("should open profile menu when clicked", () => {
    const props = {
      term: "",
      setTerm: jest.fn(),
    };
    const { container } = renderWithRouterAndProvider(<Menu {...props} />);
    const button = container.querySelector('[data-test="user-actions"]');
    expect(button).not.toEqual(null);
    const menu = document.querySelector("#primary-search-account-menu");
    expect(menu).not.toEqual(null);
    expect(menu.style._values.visibility).toEqual("hidden");
    userEvent.click(button);
    expect(menu.style._values.visibility).toBeUndefined();
  });
});
