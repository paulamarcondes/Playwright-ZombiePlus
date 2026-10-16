const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')
const { Api } = require('./api')

/**
 * @typedef {Object} PageFixtures
 * @property {LandingPage} landingPage
 * @property {LoginPage} loginPage
 * @property {MoviesPage} moviesPage
 * @property {Toast} toast
 * @property {Api} api
 */

const test = base.extend(/** @type {import('@playwright/test').Fixtures<PageFixtures>} */({
    landingPage: async ({ page }, use) => { await use(new LandingPage(page)) },
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)) },
    moviesPage: async ({ page }, use) => { await use(new MoviesPage(page)) },
    toast: async ({ page }, use) => { await use(new Toast(page)) },
    api: async ({ request }, use) => {
        const api = new Api(request)
        await api.setToken()
        await use(api)
    }
}))

module.exports = { test, expect }
