# AI Agent Guidelines for WINS MVP Repository

Welcome, AI assistants! This document provides guidance for working effectively within this repository. Your adherence to these guidelines will help maintain code quality, consistency, and streamline development.

## General Principles

1.  **Understand Your Role:** Your current task is defined by the active plan step. Focus on completing that step thoroughly. The overall project context is available in the main `README.md` and your initial briefing.
2.  **Follow the Plan:** Adhere to the established plan. If you believe a change to the plan is necessary, use the `set_plan` tool to propose the change and explain your reasoning.
3.  **Incremental Changes:** Make small, incremental changes and test them if possible. This makes debugging easier.
4.  **Idempotency:** Where possible, ensure your actions are idempotent (e.g., scripts can be run multiple times without negative side effects).
5.  **Clarity and Communication:** Use `message_user` to explain your actions, assumptions, or if you encounter issues. If you need input, use `request_user_input`.

## File and Directory Structure

*   `backend/`: Contains all backend Node.js service code.
    *   Primary Contact: Engineer 2
*   `frontend/`: Contains all frontend Next.js/React application code.
    *   Primary Contact: Engineer 1
*   `database/`: Contains database-related scripts.
    *   `database/migrations/`: Stores all database migration files.
    *   Primary Contact: Engineer 3
*   `docs/`: Project documentation (environment setup, deployment, etc.).
*   `tests/`: Contains test code.
    *   `tests/integration/`: Integration tests owned by Jules (DevOps).
    *   Unit tests will reside within `backend/tests` or `frontend/tests` respectively, managed by the relevant engineers.
*   `.github/workflows/`: GitHub Actions CI/CD workflow configurations.
*   `CONTRIBUTING.md`: Guidelines for local setup and contributions.
*   `AGENTS.md`: This file.

## Coding Conventions

*   **JavaScript/TypeScript:** (Details to be added once ESLint/Prettier are set up by respective engineers. Assume standard modern JavaScript practices for now).
*   **Environment Variables:**
    *   Use `.env.example` files to show available variables.
    *   Actual secrets or environment-specific values go into `.env` (backend) or `.env.local` (frontend), which **must be gitignored**.
    *   In CI/CD, secrets will be managed via GitHub Actions Secrets.
*   **Commit Messages:** Follow Conventional Commits format (e.g., `feat: ...`, `fix: ...`, `docs: ...`, `ci: ...`).

## CI/CD Pipeline (`.github/workflows/main.yml`)

*   The pipeline includes linting, building, testing, and deployment stages.
*   Ensure any changes to build processes or test commands are reflected in the CI workflow file.
*   **Secrets in CI:** Use `secrets.VARIABLE_NAME` for any sensitive information. These are configured in the GitHub repository settings, not in the code.

## Testing

*   **Unit Tests:** Written by Engineer 1 (Frontend) and Engineer 2 (Backend).
*   **Integration Tests (`tests/integration/`):** Written by Jules (DevOps/Integration Testing). These are critical for verifying cross-component functionality.
    *   When adding features that span frontend-backend or involve external services (Auth0, n8n), ensure corresponding integration tests are considered and ideally implemented.
*   **Automated Checks:** (Placeholder for future) If any programmatic checks are added to this `AGENTS.md` or other agent instruction files, you MUST run them and ensure they pass after your changes.

## Specific Tool Usage

*   **`create_file_with_block` / `overwrite_file_with_block`:** Use for creating or fully replacing files.
*   **`replace_with_git_merge_diff`:** Use for targeted modifications within existing files. Be precise with your search and replace blocks.
*   **`run_in_bash_session`:** Use for executing commands, installing dependencies, running scripts. Remember the session is persistent.

## Collaboration with Engineers

*   **Frontend (Engineer 1):** Coordinate on frontend build pipeline, Vercel deployment, API endpoint configurations in the frontend.
*   **Backend API (Engineer 2):** Coordinate on API deployment (Railway), environment variables, logging, API integration testing.
*   **Database (Engineer 3):** Coordinate on database deployment, migration strategy, backup/recovery.
*   **Authentication (Engineer 4):** Coordinate on Auth0 setup, secrets, SSL/TLS, authentication testing.

## Secrets Management

*   **NEVER commit secrets or sensitive credentials directly into the codebase.**
*   Use `.env.example` files for local development templates.
*   Use GitHub Actions Secrets for CI/CD environments.
*   Auth0 tenant details will be managed per environment.

If you are unsure about any of these guidelines, please ask for clarification using `request_user_input`. Your primary goal is to assist in building a reliable and maintainable system.
