Cypress.Commands.add("loginUser", ({username,password}) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {username,password}).then(({body}) => {
    localStorage.setItem("loggedBlogger", JSON.stringify(body))
    cy.visit("http://localhost:5173")
  })
})


Cypress.Commands.add("createBlog", ({title,author,url}) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: {title,author,url},
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedBlogger")).token}`
    }
  })
  cy.visit("")
})

Cypress.Commands.add("createUser", ({username,name,password}) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, {username,name,password})
})
