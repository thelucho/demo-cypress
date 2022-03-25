describe('Navegación', () => {

  it('Podemos navegar entre las rutas de agregar y buscar, y la URL cambia al hacerlo', () => {
    cy.visit('/')

    cy.url().should('contain', '/search')

    cy.get('[href="/add"]').click()
    cy.url().should('contain', '/add')

    cy.get('[href="/search"]').click()
    cy.url().should('contain', '/search')
  })
  
})