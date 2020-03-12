describe('wildcard test', () => {
    beforeEach(() => cy.visit('http://localhost:4200/asfasdf'));

    it('should display message', () => {
        cy.contains('404 Error: Page Not Found');
    });
})