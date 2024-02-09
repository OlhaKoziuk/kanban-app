import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportWidth: 800,
    viewportHeight:700,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
