import axios from "axios";
// bookish.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const APP_URL = "http://localhost:3000";
const API_URL = "http://localhost:4000/api";
const TEST_CREDENTIALS = {
  username: "juntao",
  password: "123456",
};
const TEST_REGISTER_CREDENTIALS = {
  username: "harold",
  email: "harold@email.com",
  password: "123456",
  confirmPassword: "123456",
};

async function cleanup() {
  await axios.delete(`${API_URL}/books`);
}

function login(credentials) {
  cy.get('[data-test="login-username"]').type(credentials.username);
  cy.get('[data-test="login-password"]').type(credentials.password);
  cy.get('[data-test="login-submit"]').click();
}

function goToApp() {
  cy.visit(APP_URL);
}

function checkAppTitle() {
  cy.get('h2[data-test="heading"]').contains("Bookster");
}

function checkBookListWith(expectation = []) {
  cy.get('div[data-test="book-list"]').should("exist");
  cy.get("div.book-item").should(books => {
    expect(books).to.have.length(expectation.length);
    const titles = [...books].map(x => x.querySelector("h2").textContent);
    expect(titles).to.deep.equal(expectation);
  });
}

function gotoNthBookInTheList(n) {
  cy.get("div.book-item").eq(n).contains("View Details").click();
}

function checkBookDetail(expected, n) {
  cy.url().should("include", `/books/${n}`);
  cy.get("h1.book-title").contains(expected);
}

function searchFor(term) {
  cy.get('[data-test="search"] input').type(term);
}

function composeReview(content) {
  cy.get('textarea[name="content"]').type(content);
  cy.get('button[name="submit"]').click();
}

function checkReview(expected) {
  cy.get('[data-test="reviews-container"] [data-test="review"]').should(
    "have.length",
    1
  );
  cy.get('[data-test="reviews-container"] [data-test="review"]').contains(
    expected.name
  );
  cy.get('[data-test="reviews-container"] [data-test="review"]').contains(
    expected.content
  );
}

function createAccount(credentials) {
  cy.get('[data-test="register-button"]').click();
  cy.get('[data-test="register-username').type(credentials.username);
  cy.get('[data-test="register-email"]').type(credentials.email);
  cy.get('[data-test="register-password"]').type(credentials.password);
  cy.get('[data-test="register-confirm-password"]').type(
    credentials.confirmPassword
  );
  cy.get('[data-test="register-submit"]').click();
}

function logout() {
  cy.get('[data-test="user-actions"]').click();
  cy.get('[data-test="user-actions-logout').click();
}

function checkLoginForm() {
  cy.get('[data-test="login-submit');
}

describe("Bookster application", function () {
  before(() => {
    cleanup();
  });

  beforeEach(() => {
    goToApp();
  });

  it("Visits the bookish", function () {
    checkAppTitle();
  });

  it("Shows a book list", () => {
    login(TEST_CREDENTIALS);
    checkBookListWith([
      "Refactoring",
      "Building Microservices",
      "Test-Driven Development By Example",
      "Mastering React Test-Driven Development",
    ]);
  });

  it("Goes to the detail page", () => {
    login(TEST_CREDENTIALS);
    gotoNthBookInTheList(0);
    checkBookDetail("Refactoring", 1);
  });

  it("Searches for a title", () => {
    login(TEST_CREDENTIALS);
    checkBookListWith([
      "Refactoring",
      "Building Microservices",
      "Test-Driven Development By Example",
      "Mastering React Test-Driven Development",
    ]);
    searchFor("micro");
    checkBookListWith(["Building Microservices"]);
  });

  it("Writes a review for a book", () => {
    login(TEST_CREDENTIALS);
    gotoNthBookInTheList(1);
    checkBookDetail("Building Microservices", 2);
    composeReview("Excellent work!");
    checkReview({
      name: TEST_CREDENTIALS.username,
      content: "Excellent work!",
    });
  });

  it("Doesn't submit a review with missing content", () => {
    login(TEST_CREDENTIALS);
    gotoNthBookInTheList(1);
    checkBookDetail("Building Microservices", 2);
    cy.get('button[name="submit"]').click();
    cy.get('[data-test="reviews-container"] [data-test="review"]').should(
      "have.length",
      1
    );
  });

  it("Can create a new account", () => {
    createAccount(TEST_REGISTER_CREDENTIALS);
    checkBookListWith([
      "Refactoring",
      "Building Microservices",
      "Test-Driven Development By Example",
      "Mastering React Test-Driven Development",
    ]);
  });

  it("Can logout", () => {
    login(TEST_CREDENTIALS);
    logout();
    checkLoginForm();
  });
});
