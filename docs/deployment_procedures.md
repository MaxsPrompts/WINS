# Deployment Procedures

This document outlines the process for deploying the WINS MVP application to various environments.

## Overview

Deployments are managed via GitHub Actions CI/CD pipelines. The goal is to make deployments safe, predictable, and automated as much as possible.

## Environments

*   **Local Development:** Not a "deployment" in the CI/CD sense. Developers run the application locally. See `CONTRIBUTING.md`.
*   **Staging:** Deployed automatically on pushes/merges to the `main` branch (or a dedicated `staging` branch if implemented).
*   **Production:** Deployed after manual approval, typically from the `main` branch (or tagged releases).

## CI/CD Pipeline Stages (High-Level)

The `.github/workflows/main.yml` file contains the detailed configuration.

1.  **Trigger:** Push to `main` branch or Pull Request to `main`.
2.  **Lint:** Code is checked for style and basic errors. (Jobs: `lint`)
3.  **Build:** Frontend and backend applications are compiled/built. (Jobs: `build`)
4.  **Test:** Automated tests (unit and integration) are run. (Jobs: `test`)
    *   *Unit tests are expected to be run by individual service build steps if configured by respective engineers.*
    *   *Integration tests will be run as a separate step.*
5.  **Deploy to Staging (Conditional - on push to `main`):**
    *   Backend deployed to Railway.
    *   Frontend deployed to Vercel (or Railway).
    *   Database migrations applied (if any).
6.  **Smoke Test Staging:** Basic health checks and critical path tests run against the staging environment.
7.  **Manual Approval for Production:** A designated team member must approve the deployment to production (via GitHub Actions environment protection rules or manual workflow trigger).
8.  **Deploy to Production:**
    *   Backend deployed to Railway.
    *   Frontend deployed to Vercel.
    *   Database migrations applied (if any).
9.  **Production Health Checks:** Post-deployment checks to ensure the application is stable.
10. **Notify Team:** Team is notified of deployment status (success or failure).

## Detailed Steps (To Be Expanded)

### Staging Deployment

*   **Trigger:** Automatic on merge to `main`.
*   **Backend (Railway):**
    *   The CI job will use Railway CLI or API (via a GitHub Action like `railwaycat/action-deploy`) to deploy the latest commit from the `backend/` directory.
    *   Environment variables are sourced from Railway service settings (linked to GitHub Secrets if needed).
*   **Frontend (Vercel):**
    *   Vercel's GitHub integration will typically handle automatic deployments from the `frontend/` directory.
    *   Environment variables are sourced from Vercel project settings.
*   **Database Migrations (Railway):**
    *   A script will be run (e.g., `npm run migrate:up` in the backend service) as part of the backend deployment process to apply new migrations.

### Production Deployment

*   **Trigger:** Manual approval after successful staging deployment and testing.
*   **Process:** Similar to staging, but targets production services on Railway and Vercel.
*   **Rollback:**
    *   Vercel and Railway provide mechanisms for instant rollbacks to previous deployments. This will be the primary method for quick recovery.
    *   Document specific rollback steps for each platform here.

## Secrets Management

*   All secrets (API keys, database passwords, Auth0 client secrets) are stored as GitHub Actions Secrets for CI/CD.
*   These secrets are then used to configure environment variables in Railway and Vercel during deployment.
*   **No secrets are stored in the repository.**

## Key Contacts

*   Jules (DevOps & Integration Testing): For CI/CD pipeline issues, deployment process.
*   Respective Engineers for service-specific deployment issues.

This document will be updated as the CI/CD pipeline matures and specific deployment tools and configurations are finalized.
