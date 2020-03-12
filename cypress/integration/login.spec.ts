describe('login', () => {
  beforeEach(() => cy.visit('http://localhost:4200/login'));
  
  it('should login', () => {
    cy.get('input[type="email"]').type('e@e.com');
    cy.get('input[type="password"]').type('pass');
    cy.get('button[type="submit"]').click();
  });
});
