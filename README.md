![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)


# Zombie Plus - Playwright E2E Tests

End-to-end test automation for **Zombie Plus**, a Halloween-inspired zombie movie and TV series streaming web app.


## About

- Built during the **Playwright Zombie Edition** course, taught by **Fernando Papito**.
- Part of my QA portfolio, showcasing just a little bit of my Playwright automation practices.
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


## Project structure

```
docs/                  Regression tests and roadmap (PDF)
tests/
├── e2e/               Test suites (*.spec.js)
├── pages/             Page Objects
└── support/
    ├── api/           API client for test setup
    ├── fixtures/      JSON test data + cover images
    ├── database.js    PostgreSQL helper
    └── index.js       Custom fixtures
playwright.config.js   Browsers, workers, reporter
```


## Technologies

- Node.js
- Playwright
- JavaScript
- Faker
- PostgreSQL
- Docker


## How to run

**Prerequisites:** the Zombie Plus app, API, and database (provided by the course) running locally:

| Service | URL |
|---|---|
| Web app | http://localhost:3000 |
| API | http://localhost:3333 |
| pgAdmin (DB admin UI) | http://localhost:16543 |
| PostgreSQL | localhost:5432 |

1. Clone the repository and install the dependencies
```
npm install
```

2. Run the tests in headless mode
```
npx playwright test
```

3. View the test report
```
npx playwright show-report
```


## Credits

Course and App by instructor **Fernando Papito**.
