describe("Smoke test for Book-App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should have loaded a book or the add new button", () => {
    cy.get('[data-test-id="book-list"]')
      .then(($list) => {
        if ($list.find("h2").length) {
          return "h2";
        }
        return "button";
      })
      .then((selector) => {
        cy.get(selector).should("have.length.at.least", 1);
      });
  });
  it("add a book", () => {
    cy.get("h2").first().click();
    cy.get("input[name='title']").clear().type("test");
    cy.get("input[name='author']").clear().type("test");
    cy.get("textarea[name='description']").clear().type("test");
    cy.get("button[name='save-new']").click();
    cy.get("h2").first().should("have.text", "test");
  });

  it("update test book", () => {
    cy.get("h2").contains("test").first().click();
    cy.get("input[name='title']").clear().type("Testing...");
    cy.get("button[name='save']").click();
    cy.get("h2").first().should("have.text", "Testing...");
  });

  it("delete the testing book", () => {
    cy.get("h2").contains("Testing...").first().click();
    cy.get("button[name='delete']").click();
    cy.get("h2").should("not.have.text", "Testing...");
  });
});

export {};
