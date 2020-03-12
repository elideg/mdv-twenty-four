describe('pokemon master detail view', () => {
    
    describe('should test all pokemon crud', () => {
        beforeEach(() => cy.visit('http://localhost:4200/pokemon'))
        
        it('shoud select all pokemon', () => {
            cy.get('mat-list-item').click({ multiple: true});
        });

        it('should select a pokemon', () => {
            cy.get('mat-list-item').eq(1).click();
        })

        it('should create a pokemon', () => {
            cy.get('input[name="name"]').type('Squirtle');
            cy.get('textarea[name="height"]').type('122');
            cy.get('textarea[name="base_experience"]').type('12312');
            cy.get('textarea[name="weight"]').type('12341');
            cy.get('button[type="submit"]').click();
        })

        it('should delete a pokemon', () => {
            cy.get(':nth-child(1) > .mat-list-item-content > .mr-3').click();
        })

        it('shoud update a pokemon', () => {
            cy.get('mat-list-item').first().click();
            cy.get('input[name="name"]').type('updated name');
            cy.get('button[type="submit"]').click();
        })

        it('should reset a selected pokemon', () => {
            cy.get('mat-list-item').eq(1).click();
            cy.get('button[type="cancel"]').click();
        })
    })

    describe('should do all other functionality', () => {
        it('should route to a single pokemon', () => {
            cy.get(':nth-child(1) > .mat-list-item-content > .mr-2').click();
            cy.get('.d-flex > .mat-button').click();
        });

        it('should go to next page of pokemon and go back', () => {
            cy.get('.mat-paginator-navigation-next').click();
            cy.get('.mat-paginator-navigation-previous').click();
        })
    })
})