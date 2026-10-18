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

**Prerequisites:** the Zombie Plus App, API, and Database (provided by the course) running locally:

| Service | URL |
|---|---|
| Web App | http://localhost:3000 |
| API | http://localhost:3333 |
| pgAdmin (DB admin UI) | http://localhost:16543 |
| PostgreSQL | localhost:5432 |


### Commands

1. Start the Database and pgAdmin (/apps/zombieplus-apps/)
```
docker compose up -d
```

2. Start the API and the Web App, one terminal each (/apps/zombieplus-apps/api/ and /apps/zombieplus-apps/web/)
```
npm run dev
```

3. Clone the repository
```
git clone https://github.com/paulamarcondes/Playwright-ZombiePlus.git zombieplus
```

4. Install this project's dependencies (/zombieplus/)
```
npm install
```

5. Run the tests (CLI) (/zombieplus/)
```
npx playwright test
```

6. Run the tests (UI Mode) (/zombieplus/)
```
npx playwright test --ui
```

7. View the test report (/zombieplus/)
```
npx playwright show-report
```

> **NOTE:** `.env` is committed on purpose - it holds only the course app's local default credentials.


## Credits
- E2E project by [Paula Marcondes](https://www.linkedin.com/in/paulamarcondes/)
- Course and Web App by instructor [Fernando Papito](https://fernandopapito.com/)
