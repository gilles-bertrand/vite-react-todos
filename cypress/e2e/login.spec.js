describe("We are going to test the login fonctionnality", () => {
    it("Login success", () => {
        cy.visit('/');
        cy.get('#email').click();
        cy.get('#email').type('gilles@triptyk.eu');
        cy.get('#password').type('test');
        cy.get('.bg-blue-600').click();
        cy.get('.space-y-6').submit();

    })
})