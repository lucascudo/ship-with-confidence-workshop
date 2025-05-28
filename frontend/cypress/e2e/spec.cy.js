beforeEach(() => {
  cy.intercept(
    'http://localhost:8080/*',
    { middleware: true },
    (req) => {
      req.on('before:response', (res) => {
        // force all API responses to not be cached
        res.headers['cache-control'] = 'no-store'
      })
    }
  )
})

describe('Integration Tests', () => {
  it('successfully fetches user data from the API', () => {
    cy.intercept('http://localhost:8080/user.json', { fixture: 'user.json' })
    cy.visit('/user-profile')
    cy.testUserProfileContent('Using fixtures to represent data', 'hello@cypress.io')
  })

  it('successfully fetches products data from the API', () => {
    cy.intercept('http://localhost:8080/products.json', { fixture: 'products.json' })
    cy.visit('/products')
    cy.testProductsContent()
  })
})

describe('E2E Tests', () => {
  it('successfully navigates with buttons', () => {
    cy.visit('/')
    cy.get('section > button').contains('Go to User Profile').click()
    cy.testUserProfileContent('John Doe', 'john.doe@example.com')
    cy.visit('/')
    cy.get('section > button').contains('Go to Products List').click()
    cy.testProductsContent()
  })

  it('successfully navigates with navigation menu', () => {
    cy.visit('/')
    cy.get('li > a').contains('User Profile').click()
    cy.testUserProfileContent('John Doe', 'john.doe@example.com')
    cy.get('li > a').contains('Products').click()
    cy.testProductsContent()
    cy.get('li > a').contains('Home').click()
    cy.get('#root > section > h2').should('contain.text', 'Home Page')
  })
})