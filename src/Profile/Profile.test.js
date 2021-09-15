import {
  createMockStore,
  renderWithProvider,
  findByDataTest,
} from "../testHelpers.js";
import Profile from "./Profile.js";

const TEST_USER = {
  username: "Juntao",
  email: "juntao@email.com",
};

describe("Profile", () => {
  it("renders", () => {
    const store = createMockStore({ currentUser: TEST_USER });
    const { container } = renderWithProvider(<Profile />, store);
    const username = findByDataTest(container, "profile-username");
    const email = findByDataTest(container, "profile-email");
    expect(username.textContent).toEqual("Username: " + TEST_USER.username);
    expect(email.textContent).toEqual("Email: " + TEST_USER.email);
  });
});
