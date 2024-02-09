declare namespace Cypress {
  interface Chainable {
    inputRepoURL(url: string): void;
    clickLoadIssueButton(): void;
    setLocalStorageData(): void;
  }
}
