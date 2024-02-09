/// <reference types="cypress" />

describe('My home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should have all parts', () => {
    
    cy.get('input[placeholder="Enter repo URL"]')
    .should('exist');

    cy.contains('button', 'Load issues')
      .should('exist');

    cy.contains('div', 'ToDo')
      .should('exist');

    cy.contains('div', 'In Progress')
      .should('exist');;

    cy.contains('div', 'Done')
      .should('exist');;

  });

  it('should display the error window when an input field is empty', () => {
    cy.contains('button', 'Load issue')
      .click();

    cy.contains('div', 'Error');
   });

   it('should display the error window if incorrect url was entered', () => {
    cy.get('.custom__input')
      .type('aaaaa');

    cy.contains('button', 'Load issue')
      .click();

    cy.contains('div', 'Error');
   });

  it('should have close button', () => {
    cy.inputRepoURL('https://github.com/facebook/react');

    cy.get('.custom__input__container')
      .find('svg')
      .should('exist');
  });

  it('should not display close button when input is empty', () => {
    cy.get('.custom__input');

    cy.get('.custom__input__container')
      .find('svg')
      .should('not.exist');
   });

  it('should contain breadcrumb', () => {
    cy.inputRepoURL('https://github.com/facebook/react');
    cy.clickLoadIssueButton();

    cy.get('ol.breadcrumb')
     .should('exist');
  });

  it('should display issues if repo url is correct', () => {
    cy.inputRepoURL('https://github.com/facebook/react');

    cy.clickLoadIssueButton();

    cy.setLocalStorageData();
    
    cy.get('div.board')
      .find('li')
      .should('exist');
   });

  it('should display issues', () => {
    cy.inputRepoURL('https://github.com/facebook/react');

    cy.clickLoadIssueButton();

    cy.contains('button', 'Load issue')
      .click();
    
    cy.setLocalStorageData();
  });

  it('should perform drag and drop operation', () => {
    cy.inputRepoURL('https://github.com/facebook/react');

    cy.clickLoadIssueButton();

    cy.setLocalStorageData();

    cy.contains('28246').as('source');

    cy.contains('In Progress').parent().as('target');

    cy.get('@source').trigger('dragstart');

    cy.get('@target').trigger('dragover');

    cy.get('@target').trigger('drop');

    cy.get('@target').contains('28246').should('exist');
  }); 

  it('should check if the elements are swapped', () => {
    cy.inputRepoURL('https://github.com/facebook/react');

    cy.clickLoadIssueButton();

    cy.setLocalStorageData();

    cy.contains('28246').as('source');

    cy.contains('28247').as('target');
  
    let sourceInitialPosition;
    let targetInitialPosition;
  
    cy.get('@source').then($source => {
      sourceInitialPosition = $source.index();
    });
  
    cy.get('@target').then($target => {
      targetInitialPosition = $target.index();
    });
  
    cy.get('@source').trigger('dragstart');
    cy.get('@target').trigger('dragover');
    cy.get('@target').trigger('drop');
  
    cy.get('@source').then($source => {
      expect($source.index()).to.equal(targetInitialPosition);
    });
  
    cy.get('@target').then($target => {
      expect($target.index()).to.equal(sourceInitialPosition);
    });
  });  
});