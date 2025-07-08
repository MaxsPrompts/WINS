# Environment Setup Guide

This document provides an overview of the different environments for the WINS MVP project and links to detailed setup instructions.

## Environments Overview

1.  **Local Development Environment:**
    *   **Purpose:** For individual developers to build and test features on their local machines.
    *   **Components:** Local instances of frontend, backend, PostgreSQL database (via Docker), connections to Auth0 development tenant, and n8n development webhooks.
    *   **Setup Instructions:** See `CONTRIBUTING.md` in the root directory.

2.  **Staging Environment (Week 2 Target):**
    *   **Purpose:** Pre-production environment for integration testing, QA, and stakeholder previews. Aims to mirror production as closely as possible.
    *   **Components:**
        *   Frontend: Deployed on Vercel (or Railway initially if Vercel setup is pending).
        *   Backend: Deployed on Railway.
        *   Database: Railway PostgreSQL instance (staging).
        *   Auth0: Auth0 Staging Tenant.
        *   n8n: n8n Staging Webhook Endpoints.
    *   **Access:** Details will be provided once set up.
    *   **Deployment:** Automated via CI/CD pipeline from the `main` branch (or a `staging` branch if adopted).

3.  **Production Environment (Week 3 Target):**
    *   **Purpose:** Live environment accessible to end-users (sales professionals).
    *   **Components:**
        *   Frontend: Deployed on Vercel.
        *   Backend: Deployed on Railway.
        *   Database: Railway PostgreSQL instance (production).
        *   Auth0: Auth0 Production Tenant.
        *   n8n: n8n Production Webhook Endpoints.
    *   **Access:** Restricted.
    *   **Deployment:** Automated via CI/CD pipeline with manual approval, from a tagged release or `main` branch.

## Key Configuration Points

*   **Environment Variables:** Each environment will have its own set of environment variables for API keys, database connections, Auth0 settings, etc. These are managed securely:
    *   Local: `.env` files (gitignored).
    *   Staging/Production: Through Railway and Vercel environment variable management, populated via GitHub Actions Secrets where applicable.
*   **Database Migrations:** Migrations will be applied sequentially to each environment during deployment.
*   **Auth0 Tenants:** Separate Auth0 tenants are used for development, staging, and production to ensure isolation.

This document will be updated with more specific details as each environment is fully configured.
