import axios from "axios";
// bookish.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const API_ENDPOINT = "http://localhost:8080/books";
const APP_URL = "http://localhost:3000";

describe("Bookish application", function () {
  before(async () => {
    return axios.delete(`${API_ENDPOINT}?_cleanup=true`).catch(err => err);
  });

  afterEach(async () => {
    return axios.delete(`${API_ENDPOINT}?_cleanup=true`).catch(err => err);
  });

  beforeEach(async () => {
    const books = [
      { title: "Refactoring", id: 1 },
      { title: "Domain-driven design", id: 2 },
      { title: "Building Microservies", id: 3 },
    ];
    return books.map(item =>
      axios.post(`${API_ENDPOINT}`, item, {
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("Visits the bookish", function () {
    cy.visit(APP_URL);
    cy.get('h2[data-test="heading"]').contains("Bookish");
  });

  it("Shows a book list", () => {
    cy.visit(APP_URL);
    cy.get('div[data-test="book-list"]').should("exist");
    cy.get("div.book-item").should(books => {
      expect(books).to.have.length(3);
      const titles = [...books].map(x => x.querySelector("h2").textContent);
      expect(titles).to.deep.equal([
        "Refactoring",
        "Domain-driven design",
        "Building Microservies",
      ]);
    });
  });

  it("Goes to the detail page", () => {
    cy.visit(APP_URL);
    cy.get("div.book-item").contains("View Details").eq(0).click();
    cy.url().should("include", "/books/1");
    cy.get("h2.book-title").contains("Refactoring");
  });
});
