/// <reference types="cypress" />

Cypress.Commands.add('inputRepoURL', (url: string) => {
  cy.get('.custom__input').type(url);
});

Cypress.Commands.add('clickLoadIssueButton', () => {
  cy.contains('button', 'Load issue').click();
});

Cypress.Commands.add('setLocalStorageData', () => {
  localStorage.setItem('repoIssue-react', JSON.stringify([
    {
      "node_id": "PR_kwDOAJy2Ks5mCiEw",
      "number": 28246,
      "title": "chore: use versioned render in inspectedElement test",
      "created_at": "2024-02-05T15:35:58Z",
      "state": "open",
      "assignee": null,
      "author_association": "CONTRIBUTOR",
      "comments": 0
    },
    {
      "node_id": "PR_abc123DEF456GHI789",
      "number": 28247,
      "title": "fix: update documentation for new features",
      "created_at": "2024-02-06T10:20:00Z",
      "state": "open",
      "assignee": null,
      "author_association": "OWNER",
      "comments": 3
    }
  ]
  ));
});



// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


