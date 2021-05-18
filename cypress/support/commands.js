// import 'cypress-localstorage-commands'

// Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
//     console.log(localStorage.getItem('loggedInAppUser'))
//     cy.window().then(
//         window => console.log(window.localStorage.getItem('loggedNoteappUser'))
//      );
//    // JSON.parse(localStorage.getItem('loggedNoteappUser')).token
//     // cy.request({
//     //   url: 'http://localhost:3003/api/blogs',
//     //   method: 'POST',
//     //   body: { title, author, url, likes },
//     //   headers: {
//     //     'Authorization' : `bearer `
//     //   }
//     // })
  
//     cy.visit('http://localhost:3000')
//   })

Cypress.Commands.add('createBlog', (body) => {
    const headers = {
        'Authorization' : `bearer ${JSON.parse(localStorage.getItem('loggedInAppUser')).token}`
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body,
        headers})
    cy.visit('http://localhost:3000')
})