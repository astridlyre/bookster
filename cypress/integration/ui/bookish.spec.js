import axios from "axios";
// bookish.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const APP_URL = "http://localhost:3000";
const API_URL = "http://localhost:4000/api";

async function cleanup() {
  await axios.delete(`${API_URL}/books`);
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

describe("Bookster application", function () {
  before(async () => {
    await cleanup();
  });

  beforeEach(() => {
    goToApp();
  });

  it("Visits the bookish", function () {
    checkAppTitle();
  });

  it("Shows a book list", () => {
    checkBookListWith([
      "Refactoring",
      "Building Microservices",
      "Test-Driven Development By Example",
      "Mastering React Test-Driven Development",
    ]);
  });

  it("Goes to the detail page", () => {
    gotoNthBookInTheList(0);
    checkBookDetail("Refactoring", 1);
  });

  it("Searches for a title", () => {
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
    gotoNthBookInTheList(1);
    checkBookDetail("Building Microservices", 2);

    cy.get('input[name="name"]').type("Juntao Qui");
    cy.get('textarea[name="content"]').type("Excellent work!");
    cy.get('button[name="submit"]').click();
    cy.get('[data-test="reviews-container"] [data-test="review"]').should(
      "have.length",
      1
    );
  });
});
