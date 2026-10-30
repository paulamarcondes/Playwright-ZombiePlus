![Zombie Plus covers](./docs/covers.jpg)


# Zombie Plus - Playwright E2E Tests

End-to-end test automation for **Zombie Plus**, a Halloween-inspired zombie movie and TV series streaming web app.


## About

- Built during the **Playwright Zombie Edition** course, taught by **Fernando Papito**.
- Part of my QA portfolio, showcasing my Playwright automation and TypeScript practices.
- The app under test is in Portuguese (pt-BR), so UI texts, alerts, and test data are kept in Portuguese. Code, test titles, and docs are in English.


## Test coverage

| Suite | File | Scenarios |
|---|---|---|
| Leads (waiting list) | [leads.spec.ts](tests/e2e/leads.spec.ts) | Register a lead, duplicate lead, invalid email, required fields |
| Login (admin) | [login.spec.ts](tests/e2e/login.spec.ts) | Valid login, wrong email, wrong password, required fields |
| Movies (admin) | [movies.spec.ts](tests/e2e/movies.spec.ts) | Create, remove, duplicate, required fields, search |
| Series (admin) | [series.spec.ts](tests/e2e/series.spec.ts) | Create, remove, duplicate, required fields, search |

**22 tests**, run on Chromium, Firefox, and WebKit.

> **Naming:** the UI calls it **"Séries de TV"**, while the API routes and database table use **`tvshows`**. Tests follow the UI name (`series`).


## Highlights

- **TypeScript (strict)** - type-checked with `npm run typecheck` ([tsconfig.json](tsconfig.json))
- **Page Object Model** - page classes in [tests/pages](tests/pages)
- **Custom fixtures** - typed pages and API client injected into tests ([tests/support/index.ts](tests/support/index.ts))
- **Validated config** - `.env` loaded and checked at startup; a missing variable fails fast ([tests/support/env.ts](tests/support/env.ts))
- **API setup** - test data created via REST API for faster, independent tests ([tests/support/api](tests/support/api))
- **Database cleanup** - PostgreSQL reset before the leads, movies, and series suites ([tests/support/database.ts](tests/support/database.ts))
- **Dynamic test data** - Faker for unique leads; typed JSON fixtures and cover images for movies and series ([tests/support/fixtures](tests/support/fixtures))


## Technologies

- Node.js
- TypeScript
- Playwright
- Faker
- dotenv
- PostgreSQL
- Docker


## How to run

**Prerequisites:**
- Node.js (tested with v24)
- Docker (for the course environment)

Running the tests needs **two separate things**:

| Part | What it is | Where it comes from |
|---|---|---|
| **A. Course environment** | Zombie Plus Web App, API, and Database (the system under test) | Course material - **not in this repo** |
| **B. Test project** | Playwright tests | **This repo** |

> **IMPORTANT:** Part A must be running before you run any command in Part B. Otherwise all tests fail.


### A. Start the course environment (course material required)

| Service | URL |
|---|---|
| Web App | http://localhost:3000 |
| API | http://localhost:3333 |
| pgAdmin (DB admin UI) | http://localhost:16543 |
| PostgreSQL | localhost:5432 |

1. Start the Database and pgAdmin  
   Run in: `<course-material>/apps/zombieplus/`
   ```
   docker compose up -d
   ```

2. Start the API (terminal 1)  
   Run in: `<course-material>/apps/zombieplus/api/`
   ```
   npm run dev
   ```

3. Start the Web App (terminal 2)  
   Run in: `<course-material>/apps/zombieplus/web/`
   ```
   npm run dev
   ```


### B. Run the tests (this repo)

1. Clone, then install dependencies and browsers
   ```
   git clone https://github.com/paulamarcondes/Playwright-ZombiePlus.git zombieplus
   cd zombieplus
   npm install
   npx playwright install
   ```
   > **NOTE:** no `.env` setup needed. `.env` is committed on purpose - it holds only the course app's local default credentials.

2. Choose how to run them  
   Run in: `zombieplus/` (repo root)

| Goal | Command |
|---|---|
| Run all tests (CLI) | `npm test` |
| Run tests in UI Mode | `npm run test:ui` |
| Open the last HTML report | `npm run report` |
| Type-check the code | `npm run typecheck` |

> **NOTE:** Playwright runs `.ts` files directly but does **not** type-check them. Run `npm run typecheck` to catch type errors.


## Credits
- E2E project by [Paula Marcondes](https://www.linkedin.com/in/paulamarcondes/)
- Course and Web App by instructor [Fernando Papito](https://fernandopapito.com/)
