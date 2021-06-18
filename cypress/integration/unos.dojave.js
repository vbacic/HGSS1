describe('Testiranje funkcionalnosti unosa, pregleda unosa i brisanja', () => {
  it('Second test', () => {
      cy.visit('/')



          cy.get('.hitnoca')
          .type('5')

      cy.get('.ime')
          .type('maja')

      cy.get('Table').contains('td', 'Tina').get('.block  mx-auto text-white rounded bg-green-400 border border-b-4 border-green-600').click()

  })
})

