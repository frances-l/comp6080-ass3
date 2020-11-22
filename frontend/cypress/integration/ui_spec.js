/* eslint-disable no-undef */

describe('UI Test', () => {
  // registers
  it('UI test', () => {
    cy.visit('http://localhost:3000');
    cy.get('#register').click();

    // submits register form

    cy.get('#name').type('aaaaaaaa')
      .should('have.value', 'aaaaaaaa');
    cy.get('#email').type('sss@email.com')
      .should('have.value', 'sss@email.com');
    cy.get('#password').type('b')
      .should('have.value', 'b');
    cy.get('#submit').click();

    // create a quiz

    cy.get('#create-quiz').click();
    cy.get('#quiz-title').type('My Quiz')
      .should('have.value', 'My Quiz');
    cy.get('#submit').click();

    // change the title of the quiz

    cy.get('#change-title').click();
    cy.get('#new-title').type('My Cool Quiz')
      .should('have.value', 'My Cool Quiz');
    cy.get('#submit-title').click();

    // start a game

    cy.get('#redirect-dashboard').click();
    cy.get('#start-end').click();
    cy.get('#link-modal').type('{esc}');

    // end the game

    cy.get('#start-end').click();
    cy.get('#yes').click();

    // logout and log back in again

    cy.get('#logout').click();
    cy.get('#email').type('sss@email.com')
      .should('have.value', 'sss@email.com');
    cy.get('#password').type('b')
      .should('have.value', 'b');
    cy.get('#submit').click();
  });
});
