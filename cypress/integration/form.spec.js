describe('Form', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Automatski je fokusiran na prvi input', () => {
      cy.focused().should('have.class', 'focus:outline-none w-full bg-gray-300 p-4 border mb-3')
    })
  })
