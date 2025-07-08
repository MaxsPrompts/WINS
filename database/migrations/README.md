# Database Migrations

This directory will store all database migration scripts.

## Purpose
Migrations are used to evolve the database schema in a consistent and version-controlled manner.
This is crucial for managing changes to the database structure across different environments (development, staging, production).

## Tooling (Planned)
*   A migration tool compatible with Node.js and PostgreSQL (e.g., `node-pg-migrate`, `Knex.js migrations`, or Sequelize migrations). The choice will be finalized by Engineer 3 (Database).

## Process
1.  New migration scripts are created here.
2.  Migrations are run as part of the deployment process.
3.  The local development setup should include instructions on how to run migrations.

## Key Contacts
*   Engineer 3 (Database)
*   Jules (DevOps & Integration Testing) for incorporating migrations into CI/CD.
