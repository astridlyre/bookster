import axios from "axios";
// bookish.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const APP_URL = "http://localhost:3000";
const API_URL = "http://localhost:8080";

async function cleanup() {
  await axios.delete(`${API_URL}?_cleanup=true`);
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
  cy.get("div.book-item").contains("View Details").eq(n).click();
}

function checkBookDetail(expected) {
  cy.url().should("include", "/books/1");
  cy.get("h1.book-title").contains(expected);
}

function searchFor(term) {
  cy.get('[data-test="search"] input').type(term);
}

describe("Bookster application", function () {
  beforeEach(() => {
    goToApp();
  });

  it("Visits the bookish", function () {
    checkAppTitle();
  });

  it("Shows a book list", () => {
    checkBookListWith([
      "Refactoring",
      "Domain-driven design",
      "Building Microservices",
      "Acceptance Test Driven Development with React",
    ]);
  });

  it("Goes to the detail page", () => {
    gotoNthBookInTheList(0);
    checkBookDetail("Refactoring");
  });

  it("Searches for a title", () => {
    checkBookListWith([
      "Refactoring",
      "Domain-driven design",
      "Building Microservices",
      "Acceptance Test Driven Development with React",
    ]);
    searchFor("design");
    checkBookListWith(["Domain-driven design"]);
  });

  it("Writes a review for a book", () => {
    gotoNthBookInTheList(0);
    checkBookDetail("Refactoring");

    cy.get('input[name="name"]').type("Juntao Qui");
    cy.get('textarea[name="content"]').type("Excellent work!");
    cy.get('button[name="submit"]').click();
    cy.get('div[data-test="reviews-container"] .review').should(
      "have.length",
      1
    );
  });
});
