/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Person app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
  })
  it('front page can be opened', function () {
    cy.visit('http://localhost:8080')
    cy.contains('Phonebook')
  })
  it('adds valid person', function () {
    cy.visit('http://localhost:8080')
    cy.get('#name').type('nameAddedOnCypress')
    cy.get('#number').type('121-112233')
    cy.contains('add').click()
  })
  it('fails Person without name input', function () {
    cy.visit('http://localhost:8080')
    cy.visit('http://localhost:8080')
    cy.get('#number').type('121-112233')
    cy.contains('add').click()
    cy.contains('missing')
  })
  it('fails Person without number input', function () {
    cy.visit('http://localhost:8080')
    cy.get('#name').type('nameAddedOnCypress')
    cy.contains('add').click()
    cy.contains('missing')
  })
})
