const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

/**
 * @typedef {Object} PageFixtures
 * @property {LandingPage} landingPage
 * @property {LoginPage} loginPage
 * @property {MoviesPage} moviesPage
 * @property {Toast} toast
 */

const test = base.extend(/** @type {import('@playwright/test').Fixtures<PageFixtures>} */ ({
    landingPage: async ({ page }, use) => { await use(new LandingPage(page)) },
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)) },
    moviesPage: async ({ page }, use) => { await use(new MoviesPage(page)) },
    toast: async ({ page }, use) => { await use(new Toast(page)) }
}))

module.exports = { test, expect }
