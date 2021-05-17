describe('Blog app', function() {
  
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Julian',
      username: 'Julian',
      password: 'Julian'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    
    const user2 = {
      name: 'Julian2',
      username: 'Julian2',
      password: 'Julian2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })
  
  it('front page can be opened', function() {
    cy.contains('blogs')
    cy.contains('Log in')
    cy.contains('Log in').click()

  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Julian')
      cy.get('#password').type('Julian')
      cy.get('#loginSubmit').click()
      cy.contains('Julian is logged in.')

    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('false')
      cy.get('#password').type('false')
      cy.get('#loginSubmit').click()
      cy.contains('unsuccessful')
      cy.get('#messageP').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Julian')
      cy.get('#password').type('Julian')
      cy.get('#loginSubmit').click()
      cy.contains('new blog').click()
    })

    it('A blog can be created', function() {
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submitBlog').click()
      cy.contains('show')
    })
  })
  describe('A new blog can be liked or deleted', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Julian')
      cy.get('#password').type('Julian')
      cy.get('#loginSubmit').click()
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submitBlog').click()
    })

    it('A blog can be liked', function() {
      cy.get('.show').click()
      cy.contains('likes: 0')
      cy.get('.likeButton').click()
      cy.get('.likeButton').click()
      cy.contains('likes: 2')
    })
    it('A blog can be deleted', function() {
      cy.get('.show').click()
      cy.get('.deleteButton').click()
      cy.get('.show').should('not.exist')
      cy.get('.likeButton').should('not.exist')
    })
    it('User cannot delete someone else\'s blog', function() {
      cy.get('#logout').click()
      cy.contains('Log in').click()
      cy.get('#username').type('Julian2')
      cy.get('#password').type('Julian2')
      cy.get('#loginSubmit').click()
      cy.get('.show').click()
      cy.get('.deleteButton').click()
      cy.contains('unsuccessful')

    })
  })
})

