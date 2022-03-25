const username = 'Luciano D'
const job = 'Frontend Dev'

function fillForm() { 
  cy.get('[data-cy=add] input').first().type(username)
  cy.get('[data-cy=add] input').last().type(job)
  cy.get('[data-cy=add] > button').click()
}

describe('Agregar Usuario', () => {

  beforeEach(() => {
    cy.visit('/add')
    cy.server()
  })

  it('Que el boton Create User esté habilitado sólo cuando el formulario es válido', () => {
    cy.get('[data-cy=add] > button').should('be.disabled')
  })
  
  it('Que podamos agregar un usuario y se muestre un mensaje de exito', () => {
    fillForm()
    cy.contains(`User ${username} was created successfully`).should('have.class', 'success')
  })

  it('Request Interception - 200 SUCCESS', () => {
    cy.route({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      status: 200,
      response: {
        "name": "Lucho",
        "job": "frontend developer",
        "id": "960",
        "createdAt": "2021-12-13T19:48:32.903Z"
      }
    })

    fillForm()

    cy.contains('User Lucho was created successfully').should('have.class', 'success')
  })


  it('Request Interception - 500 ERROR', () => { 
    cy.route({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      status: 500,
      response: {
        error: "Ufff",
      }
    })

    fillForm()

    cy.contains('Sorry! An error has occurred').should('have.class', 'error')
  })

})