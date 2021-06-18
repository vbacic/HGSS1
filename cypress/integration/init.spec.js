describe('Cypress', () => {
    it('je pokrenut i radi', () => {
      expect(true).to.equal(true)
    })
  })

  it('otvaranje poveznice na naslovnu stranicu', () => {
    cy.visit('/')

    // Provjera postoji li HGSS na početnoj stranici 
    cy.contains('HGSS')

    // Provjera postoji li Login poveznica na stranici 
    cy.contains('Login')

  })

 

