# Integration Tests

This directory will house all integration tests for the WINS MVP project.

## Purpose
Integration tests are designed to verify that different parts of the application work together correctly. This includes interactions between:
*   Frontend and Backend APIs
*   Backend services and the Database
*   Backend services and Auth0
*   Backend services and n8n workflows

## Tech Stack (Planned)
*   Jest (as the primary test runner and assertion library)
*   Supertest (for API endpoint testing, if applicable)
*   Playwright or Cypress (for end-to-end UI tests, if deemed necessary later)

## Running Tests
A command like `npm run test:integration` will be configured in the root `package.json` to execute these tests.
These tests will be a crucial part of the CI/CD pipeline to ensure system stability before deployments.

## Key Contacts
*   Jules (DevOps & Integration Testing) - Primary owner of these tests.
*   Collaboration with Engineer 1 (Frontend), Engineer 2 (Backend API), and Engineer 4 (Authentication) will be essential for comprehensive test coverage.
