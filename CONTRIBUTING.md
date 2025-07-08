# Contributing to WINS MVP

This document provides guidelines for setting up your local development environment and contributing to the project.

## Local Development Setup

We aim for a consistent and straightforward local development experience.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn
*   Docker (for local PostgreSQL instance)
*   Access to the team's Auth0 Development Tenant (credentials will be shared securely)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd wins-mvp/backend # Or your specific backend directory
    ```
2.  **Install dependencies:**
    ```bash
    npm install # or yarn install
    ```
3.  **Set up environment variables:**
    *   Copy the `.env.example` file to a new file named `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Fill in the required values in your `.env` file. This will include database connection details, Auth0 credentials, and n8n development webhook URLs. **Never commit your `.env` file.**
4.  **Database Setup (Local PostgreSQL using Docker):**
    *   Ensure Docker is running.
    *   Navigate to the `database` directory (if applicable, or use a general docker-compose file).
    *   Run the following command to start a local PostgreSQL instance:
        ```bash
        docker-compose up -d # Assuming a docker-compose.yml is provided
        ```
    *   Alternatively, you can run a PostgreSQL container directly:
        ```bash
        docker run --name wins-postgres -e POSTGRES_USER=youruser -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
        ```
        (Remember to replace `youruser` and `yourpassword` and use these in your backend `.env`)
    *   Run database migrations (commands will be provided by Engineer 3 - Database).
5.  **Start the backend server:**
    ```bash
    npm run dev # Or your specific start script
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend # Or your specific frontend directory
    ```
2.  **Install dependencies:**
    ```bash
    npm install # or yarn install
    ```
3.  **Set up environment variables:**
    *   Copy the `frontend/.env.example` file to a new file named `frontend/.env.local` (Vercel convention often uses `.env.local` which is gitignored by default).
        ```bash
        cp .env.example .env.local
        ```
    *   Fill in the required values in your `.env.local` file. This will primarily be the API endpoint for your local backend and Auth0 client ID. **Never commit your `.env.local` file.**
4.  **Start the frontend development server:**
    ```bash
    npm run dev # Or your specific start script
    ```

### n8n Development Webhooks

*   Ensure your local backend and frontend services are running and accessible (e.g., using a tool like ngrok if n8n workflows are triggered by external events that need to reach your localhost).
*   Configure your local n8n instance (or the development instance provided) to point its relevant webhook nodes to your local backend endpoints. Specific URLs will be documented alongside the n8n workflow designs.

### Auth0 Development Tenant

*   Credentials and configuration details for the shared Auth0 development tenant will be provided securely by the DevOps & Integration Testing Engineer (Jules).
*   Ensure your local frontend and backend `.env` files are updated with these development-specific Auth0 details (Client ID, Client Secret, Domain).

## Coding Conventions

*   (To be defined - e.g., ESLint, Prettier configurations will be added)

## Branching Strategy

*   Main branch: `main` (protected)
*   Feature branches: `feature/<feature-name>` (e.g., `feature/user-login`)
*   Bugfix branches: `bugfix/<issue-id>` or `bugfix/<description>`
*   Hotfix branches: `hotfix/<issue-id>`

## Committing Changes

*   Follow conventional commit messages: `feat: add user login page` or `fix: resolve issue with API validation`.

## Pull Requests

*   Ensure your code builds and passes any linting/local tests before submitting a PR.
*   Provide a clear description of the changes in your PR.
*   Link to any relevant issues.
*   At least one approval is required before merging (details TBD).

## Running Tests

*   Unit tests: (Instructions to be added by developers for their respective parts)
*   Integration tests: `npm run test:integration` (To be configured in Week 2)

---

This document is a living guide and will be updated as the project progresses. If you have suggestions or find discrepancies, please raise an issue or discuss with the team.
