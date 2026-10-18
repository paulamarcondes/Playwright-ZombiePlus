![Zombie Plus covers](./docs/covers.jpg)


# Zombie Plus - Playwright E2E Tests

End-to-end test automation for **Zombie Plus**, a Halloween-inspired zombie movie and TV series streaming web app.


## About

- Built during the **Playwright Zombie Edition** course, taught by **Fernando Papito**.
- Part of my QA portfolio, showcasing my Playwright automation practices.
- The app under test is in Portuguese (pt-BR), so UI texts, alerts, and test data are kept in Portuguese. Code, test titles, and docs are in English.


## Test coverage

| Suite | File | Scenarios |
|---|---|---|
| Leads (waiting list) | [leads.spec.js](tests/e2e/leads.spec.js) | Register a lead, duplicate lead, invalid email, required fields |
| Login (admin) | [login.spec.js](tests/e2e/login.spec.js) | Valid login, wrong email, wrong password, required fields |
| Movies (admin) | [movies.spec.js](tests/e2e/movies.spec.js) | Create, remove, duplicate, required fields, search |
| Series (admin) | [series.spec.js](tests/e2e/series.spec.js) | Create, remove, duplicate, required fields, search |

**22 tests**, run on Chromium, Firefox, and WebKit.

> **Naming:** the UI calls it **"Séries de TV"**, while the API routes and database table use **`tvshows`**. Tests follow the UI name (`series`).


## Highlights

- **Page Object Model** - page classes in [tests/pages](tests/pages)
- **Custom fixtures** - pages and API client injected into tests ([tests/support/index.js](tests/support/index.js))
- **API setup** - test data created via REST API for faster, independent tests ([tests/support/api](tests/support/api))
- **Database cleanup** - PostgreSQL reset before the movies and series suites ([tests/support/database.js](tests/support/database.js))
- **Dynamic test data** - Faker for unique leads; JSON fixtures and cover images for movies and series ([tests/support/fixtures](tests/support/fixtures))


## Technologies

- Node.js
- JavaScript
- Playwright
- Faker
- dotenv
- PostgreSQL
- Docker


## How to run

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

1. Clone and install
   ```
   git clone https://github.com/paulamarcondes/Playwright-ZombiePlus.git zombieplus
   cd zombieplus
   npm install
   ```

2. Choose how to run them  
   Run in: `<this repo>/zombieplus/` (repo root)

| Goal | Command |
|---|---|
| Run all tests (CLI) | `npx playwright test` |
| Run tests in UI Mode | `npx playwright test --ui` |
| Open the last HTML report | `npx playwright show-report` |

> **NOTE:** no `.env` setup needed. `.env` is committed on purpose - it holds only the course app's local default credentials.


## Credits
- E2E project by [Paula Marcondes](https://www.linkedin.com/in/paulamarcondes/)
- Course and Web App by instructor [Fernando Papito](https://fernandopapito.com/)
