describe('Búsqueda', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })

  it('Que al hacer un request nos muestre los resultados', () => {
    cy.get('[data-cy=users]').should('not.be.visible')

    cy.get('button[type=submit]').click()

    cy.get('[data-cy=users]').should('be.visible')
    cy.get('[data-cy=users] > .card').should('have.length', 10)
  })

  it('Que al buscar algún usuario nos lo muestre en la grilla', () => {
    const userName = 'eve.holt@reqres.in'

    cy.get('button[type=submit]').click()
    cy.get('#search').type(userName)
    
    const grid = cy.get('[data-cy=users] > .card')

    grid.should('have.length', 1)
    grid.should('contain', userName)
  })

})