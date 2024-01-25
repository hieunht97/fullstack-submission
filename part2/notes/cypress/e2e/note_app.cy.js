describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Hieu Tran",
      username: "hieunht97",
      password: "12345",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("login fails with wrong credential", function () {
    cy.contains("login").click();
    cy.get("#username").type("ookokokokok");
    cy.get("#password").type("12345");
    cy.get("#login-button").click();

    // cy.get(".error").contains("Wrong credentials");
    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)");

    cy.get("html").should("not.contain", "Hieu Tran logged in");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, Worcester State University 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  describe.only("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "hieunht97", password: "12345" });
      cy.createNote({ content: "first note", important: false });
      cy.createNote({ content: "second note", important: false });
      cy.createNote({ content: "third note", important: false });
    });

    it("then example", function () {
      cy.get("button").then((buttons) => {
        console.log("number of buttons", buttons.length);
        cy.wrap(buttons[0]).click();
      });
    });

    it("a new note can be created", function () {
      cy.get("#newnote-button").click();
      cy.get("#note-input").type("a new note just created");
      cy.contains("save").click();
      cy.contains("a new note just created");
    });

    it("one of those can be made important", function () {
      // cy.contains("second note").contains("make important").click();
      // cy.contains("second note").contains("make not important");
      cy.contains("second note").parent().find("button").as("theButton");
      cy.get("@theButton").click();
      cy.get("@theButton").should("contain", "make not important");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: true,
        });
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .parent()
          .find("button")
          .as("theButton");
        cy.get("@theButton").click();

        cy.get("@theButton").should("contain", "make important");
      });
    });
  });
});
