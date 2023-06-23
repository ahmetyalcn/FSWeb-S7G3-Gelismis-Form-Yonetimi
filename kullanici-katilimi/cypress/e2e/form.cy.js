describe('Test', () => {
    beforeEach(() => {
        cy.visit("/");
       
    }) 
   
    it('isim testi', () => {
        cy.get('[data-cy="name-input"]').type("Ali Veli")
        .should("have.value", "Ali Veli");
        cy.get('[data-cy="submit-btn"]').should("be.disabled");
    
    })
    it('Yaş testi', () => {
        cy.get('[data-cy="age-input"]').type("18")
        .should("have.value", "18")
        cy.get('[data-cy="submit-btn"]').should("be.disabled");
    })
    it('Email testi', () => {
        cy.get('[data-cy="mail-input"]').type("test@gmail.com")
        .should("have.value", "test@gmail.com")
        cy.get('[data-cy="submit-btn"]').should("be.disabled");
    })
    it('Sifre testi', () => {
        cy.get('[data-cy="password-input"]').type("pass123")
        .should("have.value", "pass123")
        cy.get('[data-cy="submit-btn"]').should("be.disabled");
 
    })
    it('Kullanici onay testi', () => {
        cy.get('[data-cy="terms-input"]').click("right")
        .should("be.checked")
        cy.get('[data-cy="submit-btn"]').should("be.disabled");
    })
    it('Form eksik buton disabled kontrol testi', () => {
        cy.get('[data-cy="name-input"]').type("Ali Veli");
        cy.get('[data-cy="mail-input"]').type("aliveli@gmail.com");
        cy.get('[data-cy="password-input"]').type("aliveli123");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="submit-btn"]').should("be.disabled");
    })
    it('Form dolu buton disabled kontrol testi', () => {
        cy.get('[data-cy="name-input"]').type("Ali Veli");
        cy.get('[data-cy="age-input"]').type("18")
        cy.get('[data-cy="mail-input"]').type("aliveli@gmail.com");
        cy.get('[data-cy="password-input"]').type("aliveli123");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="submit-btn"]').should("be.enabled");
        cy.get('[data-cy="submit-btn"]').click();
    })
    it('Form submit sonrası data kontrol testi', () => {
        cy.get('[data-cy="name-input"]').type("Ali Veli");
        cy.get('[data-cy="age-input"]').type("18")
        cy.get('[data-cy="mail-input"]').type("aliveli@gmail.com");
        cy.get('[data-cy="password-input"]').type("aliveli123");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="submit-btn"]').should("be.enabled");
        cy.get('[data-cy="submit-btn"]').click().then(()=>{   
            cy.get('[data-cy="firstname"]').should("be.visible");
            cy.get('[data-cy="age"]').should("be.visible");
            cy.get('[data-cy="email"]').should("be.visible");
            cy.get('[data-cy="password"]').should("be.visible");
        });
    })

})