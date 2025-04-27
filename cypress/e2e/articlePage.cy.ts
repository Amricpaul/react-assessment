it('should display the article details', () => {
    cy.visit('http://localhost:5173/');
    cy.get('article').first().click();
    cy.get('h1').should('exist');   
});
