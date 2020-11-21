/* eslint-disable no-undef */
// Write a single test for the "happy path" of an admin that is described as:

// Registers successfully
// Creates a new game successfully
// (Not required) Updates the thumbnail and name of the game successfully
// (yes, it will have no questions)
// Starts a game successfully
// Ends a game successfully (yes, no one will have played it)
// Loads the results page successfully
// Logs out of the application successfully
// Logs back into the application successfully
describe('UI Test', () => {
  // registers
  it('UI test', () => {
    cy.visit('http://localhost:3000');
    cy.get('#register').click();

    // submits register form

    cy.get('#name').type('aaaaaaaa');
    cy.get('#email').type('lpalaspllal@email.com');
    cy.get('#password').type('b');
    cy.get('#submit').click();

    //     // logs
    //   it('login', () => {
    //     cy.get('#email').type('lplpll@email.com');
    //     cy.get('#password').type('b');
    //     cy.get('#submit').click();
    //   });

    // create a quiz

    cy.get('#create-quiz').click();
    cy.get('#quiz-title').type('My Quiz');
    cy.get('#submit').click();

    // change the title of the quiz

    cy.get('#change-title').click();
    cy.get('#new-title').type('My Cool Quiz');
    cy.get('#submit-title').click();

    // start a game

    cy.get('#redirect-dashboard').click();
    cy.get('#start-end').click();
    cy.window().click('left');
  });
});
