![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)


# Zombie Plus - Playwright E2E Tests

End-to-end test automation for **Zombie Plus**, a Halloween-inspired zombie movie streaming web app.


## About

- Built during the **Playwright Zombie Edition** course by [QAxperience](https://qaxperience.com), taught by **Fernando Papito**.
- Part of my QA portfolio, showcasing just a little bit of my Playwright automation practices.
- The app under test is in Portuguese (pt-BR), so UI texts, alerts, and test data are kept in Portuguese. Code, test titles, and docs are in English.


## Test coverage

| Suite | File | Scenarios |
|---|---|---|
| Leads (waiting list) | [leads.spec.js](tests/e2e/leads.spec.js) | Register a lead, duplicate lead, invalid email, required fields |
| Login (admin) | [login.spec.js](tests/e2e/login.spec.js) | Valid login, wrong email, wrong password, required fields |
| Movies (admin) | [movies.spec.js](tests/e2e/movies.spec.js) | Create, remove, duplicate, required fields, search |

**17 tests**, run on Chromium, Firefox, and WebKit.


## Highlights

- **Page Object Model** - page classes in [tests/pages](tests/pages)
- **Custom fixtures** - pages and API client injected into tests ([tests/support/index.js](tests/support/index.js))
- **API setup** - test data created via REST API for faster, independent tests ([tests/support/api](tests/support/api))
- **Database cleanup** - PostgreSQL reset before the movies suite ([tests/support/database.js](tests/support/database.js))
- **Dynamic test data** - Faker for unique leads; JSON fixtures for movies


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

Course and App by [QAxperience](https://qaxperience.com), instructor **Fernando Papito**.
