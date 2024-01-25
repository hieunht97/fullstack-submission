describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "hieunht97",
      name: "Hieu Tran",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.contains("Login to access your blogs");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "hieunht97", password: "12345" });
      cy.contains("Welcome, Hieu Tran!");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("danlebinz88");
      cy.get("#password").type("danlebinz88");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .and("contain", "Wrong credential");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "hieunht97", password: "12345" });
      cy.createBlog({
        title: "Second most liked blog",
        author: "Hieu Tran",
        likes: "30",
      });
      cy.createBlog({
        title: "Third most liked blog",
        author: "Hieu Tran",
        likes: "23",
      });
      cy.createBlog({
        title: "Most liked blog",
        author: "Hieu Tran",
        likes: "333",
      });
    });

    it("A blog can be created and liked", function () {
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("Likes: 31");
    });

    it("User can delete a blog", function () {
      cy.contains("view").click();
      cy.contains("delete").click();
    });

    it.only("step 6 test", function () {
      cy.get(".blogPost").eq(0).should("contain", "Most liked blog");
      cy.get(".blogPost").eq(1).should("contain", "Second most liked blog");
      cy.get(".blogPost").eq(2).should("contain", "Third most liked blog");
    });
  });
});
