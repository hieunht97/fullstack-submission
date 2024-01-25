Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, likes }) => {
  const userToken = JSON.parse(localStorage.getItem("loggedBlogappUser")).token;
  if (userToken) {
    cy.request({
      url: "http://localhost:3003/api/blogs",
      method: "POST",
      body: { title, author, likes },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        cy.log("Blog created successfully", response);
        cy.visit("http://localhost:5173");
      } else {
        cy.log(`Failed to create blog. Status code: ${response.status}`);
      }
    });
  } else {
    cy.log("User token not found. Please log in before creating a blog.");
  }
  //   cy.visit("http://localhost:5173");
});
