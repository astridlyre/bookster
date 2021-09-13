// bookish.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const APP_URL = "http://localhost:3000";

describe("Bookish application", function () {
  it("Visits the bookish", function () {
    cy.visit(APP_URL);
    cy.get('h2[data-test="heading"]').contains("Bookish");
  });

  it("Shows a book list", () => {
    cy.visit(APP_URL);
    cy.get('div[data-test="book-list"]').should("exist");
    cy.get("div.book-item").should(books => {
      expect(books).to.have.length(4);
      const titles = [...books].map(x => x.querySelector("h2").textContent);
      expect(titles).to.deep.equal([
        "Refactoring",
        "Domain-driven design",
        "Building Microservices",
        "Acceptance Test Driven Development with React",
      ]);
    });
  });

  it("Goes to the detail page", () => {
    cy.visit(APP_URL);
    cy.get("div.book-item").contains("View Details").eq(0).click();
    cy.url().should("include", "/books/1");
    cy.get("h1.book-title").contains("Refactoring");
  });

  it("Searches for a title", () => {
    cy.visit(APP_URL);
    cy.get("div.book-item").should("have.length", 4);
    cy.get('[data-test="search"] input').type("design");
    cy.get("div.book-item").should("have.length", 1);
    cy.get("div.book-item").eq(0).contains("Domain-driven design");
  });
});
