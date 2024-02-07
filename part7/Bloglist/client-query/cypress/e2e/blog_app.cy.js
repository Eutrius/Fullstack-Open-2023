describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    cy.createUser({username: "demo", name: "demonstration", password: "demo"})
    cy.visit("")
  })

  it("Login form is shown", function(){
    cy.get(".loginFormDiv").should("not.have.css", "display", "none")
  })

  describe("Login", function() {
    it("succeeds with correct credentiials", function() {
      cy.get("#username").type("demo")
      cy.get("#password").type("demo")
      cy.get("#loginBtn").click()

      cy.contains("Login successfull")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("demo")
      cy.get("#password").type("wrong")
      cy.get("#loginBtn").click()
      
      cy.contains("Invalid Username or Password")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.loginUser({username: "demo", password: "demo"})
    })

    it("a blog can be created", function() {
      cy.contains("Create Blog").click()
      cy.get("#title").type("fullstack open")
      cy.get("#author").type("helsinki")
      cy.get("#url").type("https://fullstackopen.com")
      cy.get("#createBtn").click()

      cy.contains("Successfully created fullstack open")
      cy.get("#blogList").contains("fullstack open helsinki")
    })

    describe("When there a blog", function () {
      beforeEach(function() {
        cy.createBlog({title: "fullstack open", author: "helsinki", url: "https://fullstackopen.com"})
        cy.visit("")
        cy.contains("view").click()
      })

      it("a blog can be liked", function() {
        cy.contains("likes 0")
        cy.contains("like").click()
        cy.contains("likes 1")
      })

      it("a blog can be deleted", function() {
        cy.contains("delete").click()
      })

      it("another user wont see delete button", function() {
        cy.contains("logout").click()
        cy.createUser({username: "other", name: "other user", password: "other"})
        cy.loginUser({username: "other", password: "other"})
        cy.contains("view").click()
        cy.get("#deleteBtn").should("have.css", "display", "none")

      })
    })
  })

  it("blogs are ordered by the most likes", function() {
    cy.loginUser({username: "demo", password: "demo"})
    cy.createBlog({title: "blog with 0 likes", author: "demo", url: "placeholder.com"})
    cy.createBlog({title: "blog with 1 likes", author: "demo", url: "placeholder.com"})
    cy.createBlog({title: "blog with 2 likes", author: "demo", url: "placeholder.com"})
    cy.visit("")
    
    cy.contains("blog with 2 likes demo").contains("view").click()
    cy.contains("blog with 2 likes demo").contains("like").click()
    cy.contains("likes 1")
    cy.contains("blog with 2 likes demo").contains("like").click()
    cy.contains("likes 2")
    cy.contains("hide").click()

   
    cy.contains("blog with 1 likes demo").contains("view").click()
    cy.contains("blog with 1 likes demo").contains("like").click()
    cy.contains("likes 1")
    cy.contains("hide").click()



    cy.get("#blogList").find(".titleAuthorDiv").eq(0).should("contain", "blog with 2 likes demo")
    cy.get("#blogList").find(".titleAuthorDiv").eq(1).should("contain", "blog with 1 likes demo")
    cy.get("#blogList").find(".titleAuthorDiv").eq(2).should("contain", "blog with 0 likes demo")


  })
})
