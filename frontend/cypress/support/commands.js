// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('testUserProfileContent', (name, email) => {
  cy.get('h2').should('contain.text', `Name: ${name}`)
  cy.get('p').should('contain.text', `Email: ${email}`)
})

Cypress.Commands.add('testProductsContent', () => {
  cy.get('thead tr:nth-child(1) th:nth-child(1)').should('contain.text', 'Name')
  cy.get('thead tr:nth-child(1) th:nth-child(2)').should('contain.text', 'Price')
  cy.get('tbody tr:nth-child(1) th:nth-child(1)').should('contain.text', 'Fruits')
  cy.get('tbody tr:nth-child(2) td:nth-child(1)').should('contain.text', 'Apple')
  cy.get('tbody tr:nth-child(2) td:nth-child(2)').should('contain.text', '€1')
  cy.get('tbody tr:nth-child(3) td:nth-child(1)').should('contain.text', 'Dragonfruit')
  cy.get('tbody tr:nth-child(3) td:nth-child(2)').should('contain.text', '€1')
  cy.get('tbody tr:nth-child(4) td:nth-child(1) span').should('have.css', 'color', 'rgb(255, 0, 0)') // red color for Passionfruit
  cy.get('tbody tr:nth-child(4) td:nth-child(1)').should('contain.text', 'Passionfruit')
  cy.get('tbody tr:nth-child(4) td:nth-child(2)').should('contain.text', '€2')
  cy.get('tbody tr:nth-child(5) th:nth-child(1)').should('contain.text', 'Vegetables')
  cy.get('tbody tr:nth-child(6) td:nth-child(1)').should('contain.text', 'Spinach')
  cy.get('tbody tr:nth-child(6) td:nth-child(2)').should('contain.text', '€2')
  cy.get('tbody tr:nth-child(7) td:nth-child(1) span').should('have.css', 'color', 'rgb(255, 0, 0)') // red color for Pumpkin
  cy.get('tbody tr:nth-child(7) td:nth-child(1)').should('contain.text', 'Pumpkin')
  cy.get('tbody tr:nth-child(7) td:nth-child(2)').should('contain.text', '€4')
  cy.get('tbody tr:nth-child(8) td:nth-child(1)').should('contain.text', 'Peas')
  cy.get('tbody tr:nth-child(8) td:nth-child(2)').should('contain.text', '€1')
})