import { test as base, expect } from '@playwright/test'

import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { MoviesPage } from '../pages/MoviesPage'
import { SeriesPage } from '../pages/SeriesPage'
import { Popup } from '../pages/Popup'
import { Api } from './api'

type Fixtures = {
    landingPage: LandingPage
    loginPage: LoginPage
    moviesPage: MoviesPage
    seriesPage: SeriesPage
    popup: Popup
    api: Api
}

export const test = base.extend<Fixtures>({
    landingPage: async ({ page }, use) => { await use(new LandingPage(page)) },
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)) },
    moviesPage: async ({ page }, use) => { await use(new MoviesPage(page)) },
    seriesPage: async ({ page }, use) => { await use(new SeriesPage(page)) },
    popup: async ({ page }, use) => { await use(new Popup(page)) },
    api: async ({ request }, use) => {
        const api = new Api(request)
        await api.setToken()
        await use(api)
    }
})

export { expect }
