// https://docs.cypress.io/api/table-of-contents

describe('Search page tests', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h2', 'Cargo information')
  })
})
