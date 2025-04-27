describe('Home Page', () => {
    it('should load the home page', () => {
        cy.visit('http://localhost:5173'); // or whatever your Vite dev server URL is
        cy.contains('Popular Articles'); // Check if the text "Welcome" is visible
    });
});


