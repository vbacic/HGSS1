import { multiply } from "cypress/types/lodash";

describe('UI Tests', function() {
    it('should navigate to Success Page after submitting.',function(){
           // first visit the site
           cy.visit('localhost:3000/login');
           // get elements we will be
           // interacting with and alias them
           
           cy.get('input[name="email"]').as('email');
           cy.get('input[name="password"]').as('password')
           cy.get('a').as('button');
           // interact with the elements
           cy.get('@email').type('valentina.bacic2@gmail.com');
           cy.get('@password').type('proba123');
           cy.get('@button').click(multiply: true);

           // wait for the Success! message
          
           // Assert that we are in the next page
           cy.url().should('include', 'UpravljanjeDojavama');

     });
   });

